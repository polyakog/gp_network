import { DialogsResponseType, MessageItemsType } from "../types/types";
import { BaseThunkType, InferActionsTypes } from "./redux-store";
import { dialogsAPI } from "../api/dialogs-api";




const types = {
    SET_DIALOGS: 'gp-network/dialogsApi/SET_DIALOGS' as 'gp-network/dialogsApi/SET_DIALOGS',
    SET_MESSAGES: 'gp-network/dialogsApi/SET-MESSAGES' as 'gp-network/dialogsApi/SET-MESSAGES',
    TOGGLE_IS_FETCHING: 'gp-network/dialogsApi/TOGGLE_IS_FETCHING' as 'gp-network/dialogsApi/TOGGLE_IS_FETCHING',

    // ADD_MESSAGE: 'gp-network/dialogsApi/ADD-MESSAGE' as 'gp-network/dialogsApi/ADD-MESSAGE',
    DELETED_MESSAGE: 'gp-network/dialogsApi/DELETED_MESSAGE' as 'gp-network/dialogsApi/DELETED_MESSAGE',
    RESTORED_DELETED_MESSAGE: 'gp-network/dialogsApi/RESTORED_DELETED_MESSAGE' as 'gp-network/dialogsApi/RESTORED_DELETED_MESSAGE'
}

let initialState = {
    dialogData: [] as Array<DialogsResponseType>,
    messageData: [] as Array<MessageItemsType>,
    deletedMessageData: [] as Array<MessageItemsType>,
    isFetching: false,
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

        case types.DELETED_MESSAGE:

            return {
                ...state,
                deletedMessageData: [...state.deletedMessageData, action.delSpamMessage]
            };

        case types.RESTORED_DELETED_MESSAGE:

            return {
                ...state,
                deletedMessageData: [...state.deletedMessageData.filter(m=> m.id!== action.messageId)]
            };

        case types.TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }

        // case types.ADD_MESSAGE:

        //                 return {
        //         ...state,
        //         messageData: [...state.messageData, { id: 1, idMessage: idMessage, name: "Gennadij", text: action.newText }]
        //     };



        default:
            return state;

    }
}
/* Создание объектов action */

export const actions = {
    setDialogs: (dialogs: DialogsResponseType[]) => ({ type: types.SET_DIALOGS, dialogs }) as const,
    setMessages: (messages: MessageItemsType[]) => ({ type: types.SET_MESSAGES, messages }) as const,
    toggleIsFetching: (isFetching: boolean) => ({ type: types.TOGGLE_IS_FETCHING, isFetching }) as const,
    setDeletedMessage: (delSpamMessage: MessageItemsType) => ({ type: types.DELETED_MESSAGE, delSpamMessage }) as const,
    restoredDeletedMessage: (messageId: string) => ({ type: types.RESTORED_DELETED_MESSAGE, messageId }) as const
    // sendMessage: (newText: string) => ({ type: types.ADD_MESSAGE, newText }) as const,

}


export const requestDialogs = (): ThunkType => async (dispatch, getState) => {
    // dispatch(actions.toggleIsFetching(true));

    const data = await dialogsAPI.getDialogs()
    // dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setDialogs(data));
}

export const requestMessages = (userId: number, currenPage: number, pageSize: number, setTotalUsersCount: (totalCount: number) => void): ThunkType => async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true));

    const data = await dialogsAPI.getMessagesList(userId, currenPage, pageSize)
    setTotalUsersCount(data.totalCount)
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setMessages(data.items));

    

}
export const startChatting = (userId: number): ThunkType => async (dispatch, getState) => {
    const data = await dialogsAPI.startChat(userId)

}

export const addMessage = (userId: number, body: string): ThunkType => async (dispatch, getState) => {
    const data = await dialogsAPI.sendMessage(userId, body)
}

export const addDeletedMessage = (delSpamMessage: MessageItemsType): ThunkType => async (dispatch, getState) => {
    dispatch(actions.setDeletedMessage(delSpamMessage))
}

export const deleteMessage = (messageId: string, delSpamMessage: MessageItemsType): ThunkType => async (dispatch, getState) => {
    const data = await dialogsAPI.deleteMessage(messageId)
    console.log(data)
    dispatch(addDeletedMessage(delSpamMessage))

}

export const spamMessage = (messageId: string, delSpamMessage: MessageItemsType): ThunkType => async (dispatch, getState) => {
    const data = await dialogsAPI.spamMessage(messageId)
    console.log(data)
    dispatch(addDeletedMessage(delSpamMessage))
}

export const restoreMessages = (messageId: string): ThunkType => async (dispatch, getState) => {
    const data = await dialogsAPI.restoreMessage(messageId)
    console.log(data)
    dispatch(actions.restoredDeletedMessage(messageId))

}

export const showMessages = (userId: number, currentPage: number, pageSize: number, setTotalCount: React.Dispatch<React.SetStateAction<number>>): ThunkType => async (dispatch, getState) => {
    // debugger
        dispatch(requestMessages(userId, currentPage, pageSize, setTotalCount))
        dispatch(startChatting(userId))
    
}

export const requestMessagesAfterDate = (userId: number, date:string): ThunkType => async (dispatch, getState) => {
        const data = await dialogsAPI.getMessagesAfterDate(userId, date)
        dispatch(actions.setMessages(data))

}





export default dialogsApiReducer

export type InitialStateType = typeof initialState
type ActionsTypes = ReturnType<InferActionsTypes<typeof actions>>
type ThunkType = BaseThunkType<ActionsTypes>
