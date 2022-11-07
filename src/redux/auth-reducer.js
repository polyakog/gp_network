import { stopSubmit } from "redux-form";
import { authAPI, usersAPI } from "../api/api";

const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const SET_USER_DATA = 'SET_USER_DATA'
const SET_USER_PHOTO = 'SET_USER_PHOTO'


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false,
    userPhoto: null

};


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                
            };

        case SET_USER_PHOTO:
            return {
                ...state,
                userPhoto: action.userPhoto,
            };


        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }


        


        default:
            return state;


    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } })

export const setAuthUserPhoto = (userPhoto) => ({ type: SET_USER_PHOTO, userPhoto })

export const authToggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })


export default authReducer;


    /* Thunk */
export const getAuthUserData = (userId) => (dispatch) => {
    
        dispatch(authToggleIsFetching(true));
        authAPI.me().then(data => {
            
        if (data.resultCode === 0) {
        let { id, email, login } = data.data;
        dispatch(setAuthUserData(id, email, login, true));
        
        /* запрос фото пользователя */
        usersAPI.getProfile(userId)
        .then(data => {
        dispatch(setAuthUserPhoto(data.photos.small));
        dispatch(authToggleIsFetching(false));
        })
       
            }
        });
    }

export const login = (email, password, rememberMe) => (dispatch) => {
    
    authAPI.login(email, password, rememberMe)
        .then(data => {
            if (data.resultCode === 0) {
               dispatch(getAuthUserData())

            } else { 
                let message = data.messages.length>0 ? data.messages[0] : "Some Error"
                dispatch(stopSubmit("login", { _error: message}))
                }          
        })
    }

export const logout = () => (dispatch) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
                
            }
        })
}
