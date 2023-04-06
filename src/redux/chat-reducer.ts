import { stopSubmit } from "redux-form";
import { ResultCodeForCaptchaEnum, ResultCodesEnum } from "../api/api";
import { InferActionsTypes, BaseThunkType } from "./redux-store";
import { profileAPI } from "../api/profile-api";
import { authAPI } from "../api/auth-api";
import { securityAPI } from "../api/security-api";

const types = {
    TOGGLE_IS_FETCHING: 'gp-network/auth/TOGGLE_IS_FETCHING' as 'gp-network/auth/TOGGLE_IS_FETCHING',
    SET_USER_DATA: 'gp-network/auth/SET_USER_DATA' as 'gp-network/auth/SET_USER_DATA',
    SET_USER_PHOTO: 'gp-network/auth/SET_USER_PHOTO' as 'gp-network/auth/SET_USER_PHOTO',
    SET_CAPTURE_URL_SUCCESS: 'gp-network/auth/SET_CAPTURE_URL_SUCCESS' as 'gp-network/auth/SET_CAPTURE_URL_SUCCESS'
}

let initialState = {
    userId: null as number | null,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
    isFetching: false,
    userPhoto: null as null | string,
    captureUrl: null as null | string // if null then no need to display capture
};

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case types.SET_USER_DATA:
        case types.SET_CAPTURE_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,

            };

        case types.SET_USER_PHOTO:
            return {
                ...state,
                userPhoto: action.userPhoto,

            };

        case types.TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }

        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({ type: types.SET_USER_DATA, payload: { userId, email, login, isAuth } }) as const,
    setAuthUserPhoto: (userPhoto: string | null) => ({ type: types.SET_USER_PHOTO, userPhoto }) as const,
    authToggleIsFetching: (isFetching: boolean) => ({ type: types.TOGGLE_IS_FETCHING, isFetching }) as const,
    setCaptureUrlSuccess: (captureUrl: string) => ({ type: types.SET_CAPTURE_URL_SUCCESS, payload: { captureUrl } }) as const
}


export default authReducer;

// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

/* Thunk */
export const getAuthUserData = (): ThunkType => async (dispatch) => {
    dispatch(actions.authToggleIsFetching(true));

    let dataAuth = await authAPI.me()
    if (dataAuth.resultCode === ResultCodesEnum.Success) {
        let { id, email, login } = dataAuth.data;
        dispatch(actions.setAuthUserData(id, email, login, true));

        /* запрос фото пользователя */
        let dataProfile = await profileAPI.getProfile(id)
        dispatch(actions.setAuthUserPhoto(dataProfile.photos.small));
        dispatch(actions.authToggleIsFetching(false));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, capture: string | null): ThunkType => async (dispatch: any) => {

    let data = await authAPI.login(email, password, rememberMe, capture)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }

        let message = data.messages.length > 0 ? data.messages[0] : "Some Error"
        dispatch(stopSubmit("login", { _error: message }))
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captureUrl = response.url;
    dispatch(actions.setCaptureUrlSuccess(captureUrl));
}

export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export type InitialStateType = typeof initialState
type ActionsTypes = ReturnType<InferActionsTypes<typeof actions>>
type ThunkType = BaseThunkType<ActionsTypes>