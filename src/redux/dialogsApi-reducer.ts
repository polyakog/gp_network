import { DialogsResponseType, MessageItemsType } from "../types/types";
import { BaseThunkType, InferActionsTypes } from "./redux-store";
import { dialogsAPI } from "../api/dialogs-api";



const types = {
    SET_DIALOGS: 'gp-network/dialogsApi/SET_DIALOGS' as 'gp-network/dialogsApi/SET_DIALOGS',
    SET_MESSAGES: 'gp-network/dialogsApi/SET-MESSAGES' as 'gp-network/dialogsApi/SET-MESSAGES',

    // ADD_MESSAGE: 'gp-network/dialogsApi/ADD-MESSAGE' as 'gp-network/dialogsApi/ADD-MESSAGE',
    DELETE_MESSAGE: 'gp-network/dialogsApi/DELETE_MESSAGE' as 'gp-network/dialogsApi/DELETE_MESSAGE'
}
let initialState = {
    dialogData: [] as Array<DialogsResponseType>,
    messageData: [] as Array<MessageItemsType>,
};

const dialogsApiReducer = (state = initialState, action: ActionsTypes): InitialStateType => {


    switch (action.type) {

        case types.SET_DIALOGS:
            return {
                ...state,
                dialogData: action.dialogs
            };

        case types.SET_MESSAGES: {
            return {
                ...state,
                messageData: action.messages
            }
        }

        // case types.ADD_MESSAGE:

        //                 return {
        //         ...state,
        //         messageData: [...state.messageData, { id: 1, idMessage: idMessage, name: "Gennadij", text: action.newText }]
        //     };


        // case types.DELETE_MESSAGE:

        //     return {
        //         ...state,
        //         messageData: state.messageData.filter(m => m.idMessage !== action.messageId)
        //     };
        default:
            return state;

    }
}
/* Создание объектов action */

export const actions = {
    setDialogs: (dialogs: DialogsResponseType[]) => ({ type: types.SET_DIALOGS, dialogs }) as const,
    setMessages: (messages: MessageItemsType[]) => ({ type: types.SET_MESSAGES, messages }) as const,


    // sendMessage: (newText: string) => ({ type: types.ADD_MESSAGE, newText }) as const,
    deleteMessage: (messageId: number) => ({ type: types.DELETE_MESSAGE, messageId }) as const
}


export const requestDialogs = (): ThunkType => async (dispatch, getState) => {
    // dispatch(actions.toggleIsFetching(true));
    
    const data = await dialogsAPI.getDialogs()
    // dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setDialogs(data));   
}

export const requestMessages = (userId: number, currenPage: number, pageSize: number, setTotalUsersCount: (totalCount:number)=>void): ThunkType => async (dispatch, getState) => {
    // dispatch(actions.toggleIsFetching(true));
    
    const data = await dialogsAPI.getMessagesList(userId, currenPage, pageSize)
    // dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setMessages(data.items));  
    setTotalUsersCount(data.totalCount)

}
export const startChatting = (userId: number): ThunkType => async (dispatch, getState) => {
   
    const data = await dialogsAPI.startChat(userId)
    
}

export const addMessage = (userId: number, body: string): ThunkType => async (dispatch, getState) => {
    
    const data = await dialogsAPI.sendMessage(userId, body)
    
}





export default dialogsApiReducer

export type InitialStateType = typeof initialState
type ActionsTypes = ReturnType<InferActionsTypes<typeof actions>>
type ThunkType = BaseThunkType<ActionsTypes>
