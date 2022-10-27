import { profileAPI, usersAPI } from './../api/api';

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const SET_STATUS = 'SET_STATUS'

let initialState = {
    postData: [
        { id: 1, postId:1, message: 'Very interesting', likeCount: 21, Name: 'Alexey' },
        { id: 2, postId:2, message: 'How to add data?', likeCount: 2, Name: 'Anton' },
         ],
    profile: null,
    isFetching: false,
    status: null,
    
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let postId = state.postData.length+1
            return {
                ...state,
                postData: [...state.postData, { id: 3, postId: postId, message: action.newPostText, likeCount: 0, Name: 'Michail'} ]
            }                     
        }   

        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
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

                             
    
        default:
            return state;
            
    }

    

}

/* Создание объектов action */
export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const profileToggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const setStatus = (status) => ({ type: SET_STATUS, status })

export default profileReducer

/* thunk */
export const getUserProfile = (userId) => {
    return (dispatch) => {
        dispatch(profileToggleIsFetching(true));

                                                  
        usersAPI.getProfile(userId)
                .then(data => {
                    dispatch(setUserProfile(data));
                    dispatch(profileToggleIsFetching(false));
                });

        }


    }

/* thunk */
export const getUserStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setStatus(response.data));
                });
    }
}


/* thunk */
export const updateUserStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status)
            .then(response => {
                if (response.data.resultCode===0)
                    dispatch(setStatus(status));
            });
    }
}
