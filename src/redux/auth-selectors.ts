/* Selectors */
import { AppStateType } from "./redux-store"


export const selectCurrentUserLogin = (state:AppStateType) => {
    return state.auth.login
}

export const selectIsAuth = (state:AppStateType) => {
    return state.auth.isAuth
}

export const selectCurrentUserId = (state:AppStateType) => {
    return state.auth.userId
}

export const selectCurrentUserPhoto = (state:AppStateType) => {
    return state.auth.userPhoto
}


