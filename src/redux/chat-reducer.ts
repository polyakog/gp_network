import { InferActionsTypes, BaseThunkType } from "./redux-store";
import { ChatMessageAPIType, StatusType, chatAPI } from "../api/chat-api";
import { Dispatch } from "redux";
import {v1} from 'uuid'


const types = {
    MESSAGES_RECIVED: 'gp-network/auth/MESSAGES_RECIVED' as 'gp-network/auth/MESSAGES_RECIVED',
    STATUS_CHANGED: 'gp-network/auth/STATUS_CHANGED' as 'gp-network/auth/STATUS_CHANGED',

}


let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType,
    messagesLoaded: 10 as number
};


const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case types.MESSAGES_RECIVED:
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({ ...m, id: v1() }))].filter((m, index, array) => index >= array.length - state.messagesLoaded),

            };

        case types.STATUS_CHANGED:
            return {
                ...state,
                status: action.payload.status,

            };

        default:
            return state;
    }
}

export const actions = {
    messagesRecieved: (messages: ChatMessageAPIType[]) => ({ type: types.MESSAGES_RECIVED, payload: { messages } }) as const,
    statusChanged: (status: StatusType) => ({ type: types.STATUS_CHANGED, payload: { status } }) as const,
}


export default chatReducer;

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesRecieved(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}


/* Thunk */
export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-recieved', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))

}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-recieved', newMessageHandlerCreator(dispatch));
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch));
    chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message);
}
export type ChatMessageType = ChatMessageAPIType & { id: string }

export type InitialStateType = typeof initialState
type ActionsTypes = ReturnType<InferActionsTypes<typeof actions>>
type ThunkType = BaseThunkType<ActionsTypes>