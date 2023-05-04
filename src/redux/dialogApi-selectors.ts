/* Selectors */
import { AppStateType } from "./redux-store"

export const getDialogs = (state:AppStateType) => {
    return state.dialogsApiPage.dialogData
}

