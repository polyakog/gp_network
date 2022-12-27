import { stopSubmit } from 'redux-form';
import { profileAPI, usersAPI } from './../api/api';

const ADD_POST = 'ADD-POST'
const DELETE_POST = 'DELETE_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const SET_STATUS = 'SET_STATUS'
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS"


let initialState = {
    postData: [
        { id: 1, postId: 1, message: 'Very interesting', likeCount: 21, Name: 'Alexey' },
        { id: 2, postId: 2, message: 'How to add data?', likeCount: 2, Name: 'Anton' },
        { id: 2, postId: 3, message: 'OK', likeCount: 3, Name: 'Anton' },
    ],
    profile: null,
    isFetching: false,
    status: null,
    

};

const profileReducer = (state = initialState, action) => {
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
export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const profileToggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postId) => ({ type: DELETE_POST, postId })
export const  savePhotoSuccess= (photoFile) => ({ type: SAVE_PHOTO_SUCCESS, photoFile })

export default profileReducer

/* thunk */
export const getUserProfile = (userId) => async (dispatch) => {
    dispatch(profileToggleIsFetching(true));

    const data = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(data));
    dispatch(profileToggleIsFetching(false));
}


/* thunk */
export const getUserStatus = (userId) => async (dispatch) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));

}


/* thunk */
export const updateUserStatus = (status) => async (dispatch) => {
    try {
       const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0)
        dispatch(setStatus(status)); 
    } catch (error) {
        alert(`Error \n -------------\n 1. Name: ${error.name} \n 2. Description: ${error.message} -> ${error.code} \n 3. Config: ${error.config.data}`)
        
    }
    

}

export const savePhoto = (photoFile) => async (dispatch) => {
    const response = await profileAPI.savePhoto(photoFile)
    // debugger
    if (response.data.resultCode === 0)
        dispatch(savePhotoSuccess(response.data.data.photos));
    if (response.data.resultCode !== 0) // error 
        window.alert(response.data.messages)

}

export const saveProfile = (profile) => async (dispatch, getState) => {
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