import { stopSubmit } from 'redux-form';
import { profileAPI, usersAPI } from '../api/api';
import { PhotosType, PostDataType, ProfileType } from '../types/types';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './redux-store';



const ADD_POST = 'gp-network/profile/ADD-POST'
const DELETE_POST = 'gp-network/profile/DELETE_POST'
const SET_USER_PROFILE = 'gp-network/profile/SET_USER_PROFILE'
const TOGGLE_IS_FETCHING = 'gp-network/profile/TOGGLE_IS_FETCHING'
const SET_STATUS = 'gp-network/profile/SET_STATUS'
const SAVE_PHOTO_SUCCESS = "gp-network/profile/SAVE_PHOTO_SUCCESS"


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

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let postId = state.postData.length + 1
            return {
                ...state,
                postData: [...state.postData, { id: 3, postId: postId, message: action.newPostText, likeCount: 0, Name: 'Michail' }]
            }
        }

        case DELETE_POST: {
            return {
                ...state, postData: state.postData.filter(p => p.postId !== action.postId)
            }
        }

        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }

        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }

        case SET_STATUS: {
            return { ...state, status: action.status }
        }

        case SAVE_PHOTO_SUCCESS: {
            return { ...state, profile:{...state.profile, photos: action.photoFile} as ProfileType}
        }

        default:
            return state;
    }
}

type ActionsTypes = AddPostActionCreatorActionType | SetUserProfileActionType | ProfileToggleIsFetchingActionType | SetStatusActionType | DeletePostActionType | SavePhotoSuccessActionType

/* Создание объектов action */
type AddPostActionCreatorActionType = { type: typeof ADD_POST, newPostText:string}
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType => ({ type: ADD_POST, newPostText })

type SetUserProfileActionType = { type: typeof SET_USER_PROFILE, profile: ProfileType }
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile })

type ProfileToggleIsFetchingActionType = { type: typeof TOGGLE_IS_FETCHING, isFetching:boolean }
export const profileToggleIsFetching = (isFetching: boolean): ProfileToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching })

type SetStatusActionType = { type: typeof SET_STATUS, status: string }
export const setStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, status })

type DeletePostActionType = { type: typeof DELETE_POST, postId: number }
export const deletePost = (postId: number): DeletePostActionType => ({ type: DELETE_POST, postId })

type SavePhotoSuccessActionType = { type: typeof SAVE_PHOTO_SUCCESS, photoFile: PhotosType }
export const savePhotoSuccess = (photoFile: PhotosType): SavePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, photoFile })

export default profileReducer

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

/* thunk */
export const getUserProfile = (userId: number): ThunkType => async (dispatch, getState) => {
    dispatch(profileToggleIsFetching(true));

    const data = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(data));
    dispatch(profileToggleIsFetching(false));
}


/* thunk */
export const getUserStatus = (userId:number): ThunkType => async (dispatch) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));

}


/* thunk */
export const updateUserStatus = (status:string):ThunkType => async (dispatch) => {
    try {
       const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0)
        dispatch(setStatus(status)); 
    } catch (error:any) {
        alert(`Error \n -------------\n 1. Name: ${error.name} \n 2. Description: ${error.message} -> ${error.code} \n 3. Config: ${error.config.data}`)
    }
    }

export const savePhoto = (photoFile:string):ThunkType => async (dispatch) => {
    const response = await profileAPI.savePhoto(photoFile)
    // debugger
    if (response.data.resultCode === 0)
        dispatch(savePhotoSuccess(response.data.data.photos));
    if (response.data.resultCode !== 0) // error 
        window.alert(response.data.messages)
}

export const saveProfile = (profile:ProfileType):ThunkType => async (dispatch:any, getState:any) => {
    const userId: number = getState().auth.userId
        const response = await profileAPI.saveProfile(profile)
        
    if (response.data.resultCode === 0)
    {console.log('Profile is saved')
    dispatch(getUserProfile(userId));}
    // if (response.data.resultCode !== 0) // error 
    // console.log(response.data.messages)
    else {
            let errorMessage = response.data.messages.length > 0 ? response.data.messages[0] : "Some Error"
            // dispatch(stopSubmit("edit-profile", { fullName: message }))
            let contactsValue = errorMessage.split('>')[1].split(')')[0];
            let contactsTitle=contactsValue.toLowerCase() // lower case
            dispatch(stopSubmit("edit-profile", { _error: errorMessage, contacts:{[contactsTitle]: `Error in ${contactsValue} URL`} }))
            return Promise.reject(errorMessage) //rejecte promice if promice=messageError
        }
}