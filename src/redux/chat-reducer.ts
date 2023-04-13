import { InferActionsTypes, BaseThunkType } from "./redux-store";
import { ChatMessageType, chatAPI } from "../api/chat-api";
import { Dispatch } from "redux";


const types = {
    MESSAGES_RECIVED: 'gp-network/auth/MESSAGES_RECIVED' as 'gp-network/auth/MESSAGES_RECIVED',

}

let initialState = {
    messages: [] as ChatMessageType[],

};

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case types.MESSAGES_RECIVED:
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages],

            };

        default:
            return state;
    }
}

export const actions = {
    messagesRecieved: (messages: ChatMessageType[]) => ({ type: types.MESSAGES_RECIVED, payload: { messages } }) as const,
}


export default chatReducer;

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesRecieved(messages))
        }
    }
    return _newMessageHandler
}


/* Thunk */
export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))

}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch));
    chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message);
}

export type InitialStateType = typeof initialState
type ActionsTypes = ReturnType<InferActionsTypes<typeof actions>>
type ThunkType = BaseThunkType<ActionsTypes>