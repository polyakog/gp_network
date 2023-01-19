import { stopSubmit } from "redux-form";
import { authAPI, profileAPI, securityAPI } from "../api/api";
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from "./redux-store";

const TOGGLE_IS_FETCHING = 'gp-network/auth/TOGGLE_IS_FETCHING'
const SET_USER_DATA = 'gp-network/auth/SET_USER_DATA'
const SET_USER_PHOTO = 'gp-network/auth/SET_USER_PHOTO'
const SET_CAPTURE_URL_SUCCESS = 'gp-network/auth/SET_CAPTURE_URL_SUCCESS'

let initialState = {
    userId: null as number | null,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
    isFetching: false,
    userPhoto: null as null | string,
    captureUrl: null as null | string // if null then no need to display capture
};

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

type ActionsTypes = SetAuthUserDataActionType | SetAuthUserPhotoActionType | AuthToggleIsFetchingActionType | SetCaptureUrlSuccessActionType

type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type SetAuthUserDataActionType = { type: typeof SET_USER_DATA, payload: SetAuthUserDataActionPayloadType }
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } })

type SetAuthUserPhotoActionType = { type: typeof SET_USER_PHOTO, userPhoto: string }
export const setAuthUserPhoto = (userPhoto: string): SetAuthUserPhotoActionType => ({ type: SET_USER_PHOTO, userPhoto })

type AuthToggleIsFetchingActionType = { type: typeof TOGGLE_IS_FETCHING, isFetching: boolean }
export const authToggleIsFetching = (isFetching: boolean): AuthToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching })

type SetCaptureUrlSuccessActionType = { type: typeof SET_CAPTURE_URL_SUCCESS, payload: { captureUrl: string } }
export const setCaptureUrlSuccess = (captureUrl: string): SetCaptureUrlSuccessActionType => ({ type: SET_CAPTURE_URL_SUCCESS, payload: { captureUrl } })


export default authReducer;

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>


/* Thunk */
export const getAuthUserData = (): ThunkType => async (dispatch) => {
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

export const login = (email: string, password: string, rememberMe: boolean, capture: any): ThunkType => async (dispatch: any) => {

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

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captureUrl = response.data.url;
    dispatch(setCaptureUrlSuccess(captureUrl));
}

export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}