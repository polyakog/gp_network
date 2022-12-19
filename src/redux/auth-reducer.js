import { stopSubmit } from "redux-form";
import { authAPI, profileAPI, securityAPI } from "../api/api";

const TOGGLE_IS_FETCHING = 'gp-network/auth/TOGGLE_IS_FETCHING'
const SET_USER_DATA = 'gp-network/auth/SET_USER_DATA'
const SET_USER_PHOTO = 'gp-network/auth/SET_USER_PHOTO'
const SET_CAPTURE_URL_SUCCESS = 'gp-network/auth/SET_CAPTURE_URL_SUCCESS'



let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false,
    userPhoto: null,
    captureUrl: null // if null then no need to display capture

};


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTURE_URL_SUCCESS:
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

export const setCaptureUrlSuccess =(captureUrl)=>({type: SET_CAPTURE_URL_SUCCESS, payload: {captureUrl}})


export default authReducer;


/* Thunk */
export const getAuthUserData = () => async (dispatch) => {
    dispatch(authToggleIsFetching(true));

    let data = await authAPI.me()
    if (data.resultCode === 0) {
        let { id, email, login } = data.data;
        dispatch(setAuthUserData(id, email, login, true));

        /* запрос фото пользователя */
    data = await profileAPI.getProfile(id)
        dispatch(setAuthUserPhoto(data.photos.small));
        dispatch(authToggleIsFetching(false));
    }
}

export const login = (email, password, rememberMe, capture) => async (dispatch) => {

    let data = await authAPI.login(email, password, rememberMe, capture)
    if (data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        let message = data.messages.length > 0 ? data.messages[0] : "Some Error"
        dispatch(stopSubmit("login", { _error: message }))
    }
    
    if (data.resultCode === 10) {
        dispatch(getCaptchaUrl())
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captureUrl = response.data.url;
        dispatch(setCaptureUrlSuccess(captureUrl));

}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}
