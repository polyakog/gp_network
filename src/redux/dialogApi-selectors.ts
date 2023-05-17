/* Selectors */
import { AppStateType } from "./redux-store"

export const getDialogs = (state:AppStateType) => {
    return state.dialogsApiPage.dialogData
}

export const getMessages = (state:AppStateType) => {
    return state.dialogsApiPage.messageData
}

export const getDeletedMessages = (state:AppStateType) => {
    return state.dialogsApiPage.deletedMessageData
}

export const getIsFetching = (state: AppStateType) => {
    return state.dialogsApiPage.isFetching
}

