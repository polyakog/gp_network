import { stopSubmit } from 'redux-form';
import { profileAPI, usersAPI } from '../api/api';

const ADD_POST = 'gp-network/profile/ADD-POST'
const DELETE_POST = 'gp-network/profile/DELETE_POST'
const SET_USER_PROFILE = 'gp-network/profile/SET_USER_PROFILE'
const TOGGLE_IS_FETCHING = 'gp-network/profile/TOGGLE_IS_FETCHING'
const SET_STATUS = 'gp-network/profile/SET_STATUS'
const SAVE_PHOTO_SUCCESS = "gp-network/profile/SAVE_PHOTO_SUCCESS"

type postDataType = { id: number, postId: number, message: string, likeCount: number, Name: string }

type InitialStateType = {
    postData: Array<postDataType>
    profile: null | string
    isFetching: boolean
    status: null | string
}


let initialState: InitialStateType = {
    postData: [
        { id: 1, postId: 1, message: 'Very interesting', likeCount: 21, Name: 'Alexey' },
        { id: 2, postId: 2, message: 'How to add data?', likeCount: 2, Name: 'Anton' },
        { id: 2, postId: 3, message: 'OK', likeCount: 3, Name: 'Anton' },
    ],
    profile: null,
    isFetching: false,
    status: null,
    

};

const profileReducer = (state = initialState, action:any): InitialStateType => {
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
            return { ...state, profile:{...state.profile, photos: action.photoFile} }
        }


        default:
            return state;

    }



}

/* Создание объектов action */
type AddPostActionCreatorActionType = { type: typeof ADD_POST, newPostText:string | null }
export const addPostActionCreator = (newPostText: string | null): AddPostActionCreatorActionType => ({ type: ADD_POST, newPostText })

type SetUserProfileActionType = { type: typeof SET_USER_PROFILE, profile:any }
export const setUserProfile = (profile: any): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile })

type ProfileToggleIsFetchingActionType = { type: typeof TOGGLE_IS_FETCHING, isFetching:boolean }
export const profileToggleIsFetching = (isFetching: boolean): ProfileToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching })

type SetStatusActionType = { type: typeof SET_STATUS, status: string|null }
export const setStatus = (status: string | null): SetStatusActionType => ({ type: SET_STATUS, status })

type DeletePostActionType = { type: typeof DELETE_POST, postId: number }
export const deletePost = (postId: number): DeletePostActionType => ({ type: DELETE_POST, postId })

type SavePhotoSuccessActionType = { type: typeof SAVE_PHOTO_SUCCESS, photoFile: string }
export const savePhotoSuccess = (photoFile: string): SavePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, photoFile })

export default profileReducer

/* thunk */
export const getUserProfile = (userId:number) => async (dispatch:any) => {
    dispatch(profileToggleIsFetching(true));

    const data = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(data));
    dispatch(profileToggleIsFetching(false));
}


/* thunk */
export const getUserStatus = (userId:number) => async (dispatch:any) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));

}


/* thunk */
export const updateUserStatus = (status:string) => async (dispatch:any) => {
    try {
       const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0)
        dispatch(setStatus(status)); 
    } catch (error) {
        alert(`Error \n -------------\n 1. Name: ${error.name} \n 2. Description: ${error.message} -> ${error.code} \n 3. Config: ${error.config.data}`)
        
    }
    

}

export const savePhoto = (photoFile:string) => async (dispatch:any) => {
    const response = await profileAPI.savePhoto(photoFile)
    // debugger
    if (response.data.resultCode === 0)
        dispatch(savePhotoSuccess(response.data.data.photos));
    if (response.data.resultCode !== 0) // error 
        window.alert(response.data.messages)

}

export const saveProfile = (profile:string) => async (dispatch:any, getState) => {
    const userId= getState().auth.userId
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