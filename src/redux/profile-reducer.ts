import { FormAction, stopSubmit } from 'redux-form';
import { ResultCodesEnum } from '../api/api';
import { PhotosType, PostDataType, ProfileType } from '../types/types';
import { BaseThunkType, InferActionsTypes } from './redux-store';
import { getAuthUserData } from './auth-reducer';
import { profileAPI } from '../api/profile-api';

const types = {
    ADD_POST: 'gp-network/profile/ADD-POST' as 'gp-network/profile/ADD-POST',
    DELETE_POST: 'gp-network/profile/DELETE_POST' as 'gp-network/profile/DELETE_POST',
    SET_USER_PROFILE: 'gp-network/profile/SET_USER_PROFILE' as 'gp-network/profile/SET_USER_PROFILE',
    TOGGLE_IS_FETCHING: 'gp-network/profile/TOGGLE_IS_FETCHING' as 'gp-network/profile/TOGGLE_IS_FETCHING',
    SET_STATUS: 'gp-network/profile/SET_STATUS' as 'gp-network/profile/SET_STATUS',
    SAVE_PHOTO_SUCCESS: 'gp-network/profile/SAVE_PHOTO_SUCCESS' as 'gp-network/profile/SAVE_PHOTO_SUCCESS'
}

let initialState = {
    postData: [
        { id: 1, postId: 1, message: 'Very interesting', likeCount: 21, Name: 'Alexey' },
        { id: 2, postId: 2, message: 'How to add data?', likeCount: 2, Name: 'Anton' },
        { id: 2, postId: 3, message: 'OK', likeCount: 3, Name: 'Anton' },
    ] as Array<PostDataType>,
    profile: null as null | ProfileType,
    isFetching: false,
    status: '' as string,
};

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case types.ADD_POST: {
            let postId = state.postData.length + 1
            return {
                ...state,
                postData: [...state.postData, { id: 3, postId: postId, message: action.newPostText, likeCount: 0, Name: 'Michail' }]
            }
        }

        case types.DELETE_POST: {
            return {
                ...state, postData: state.postData.filter(p => p.postId !== action.postId)
            }
        }

        case types.SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }

        case types.TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }

        case types.SET_STATUS: {
            return { ...state, status: action.status }
        }

        case types.SAVE_PHOTO_SUCCESS: {
            return { ...state, profile: { ...state.profile, photos: action.photoFile } as ProfileType }
        }

        default:
            return state;
    }
}

/* Создание объектов action */
export const actions = {
    addPost: (newPostText: string) => ({ type: types.ADD_POST, newPostText } as const),
    setUserProfile: (profile: ProfileType) => ({ type: types.SET_USER_PROFILE, profile } as const),
    profileToggleIsFetching: (isFetching: boolean) => ({ type: types.TOGGLE_IS_FETCHING, isFetching } as const),
    setStatus: (status: string) => ({ type: types.SET_STATUS, status } as const),
    deletePost: (postId: number) => ({ type: types.DELETE_POST, postId } as const),
    savePhotoSuccess: (photoFile: PhotosType) => ({ type: types.SAVE_PHOTO_SUCCESS, photoFile } as const),

}

export default profileReducer

/* thunk */
export const getUserProfile = (userId: number): ThunkType => async (dispatch, getState) => {
    dispatch(actions.profileToggleIsFetching(true));

    const data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data));
    dispatch(actions.profileToggleIsFetching(false));
}

export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data));
}

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        const data = await profileAPI.updateStatus(status)
        if (data.resultCode === ResultCodesEnum.Success)
            console.log('status is updated')
        dispatch(actions.setStatus(status));
    } catch (error: any) {
        alert(`Error \n -------------\n 1. Name: ${error.name} \n 2. Description: ${error.message} -> ${error.code} \n 3. Config: ${error.config.data}`)
    }
}

export const savePhoto = (photoFile: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(photoFile)
    // debugger
    if (data.resultCode === ResultCodesEnum.Success)
        dispatch(actions.savePhotoSuccess(data.data.photos))
    dispatch(getAuthUserData())
    if (data.resultCode !== ResultCodesEnum.Success) // error 
        window.alert(data.messages)
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)

    if (response.resultCode === ResultCodesEnum.Success) {
        if (userId != null) {
            console.log('Profile is saved')
            dispatch(getUserProfile(userId))
        } else {
            throw new Error("userId can't be null")
        }
    } else {
        let errorMessage = response.messages.length > 0 ? response.messages[0] : "Some Error"
        let contactsValue = errorMessage.split('>')[1].split(')')[0];
        let contactsTitle = contactsValue.toLowerCase() // lower case
        dispatch(stopSubmit("edit-profile", { _error: errorMessage, contacts: { [contactsTitle]: `Error in ${contactsValue} URL` } }))
        return Promise.reject(errorMessage) //rejecte promice if promice=messageError
    }
}

export type InitialStateType = typeof initialState
type ActionsTypes = ReturnType<InferActionsTypes<typeof actions>>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>