import { DialogDataType, MessageDataType } from "../types/types";
import { InferActionsTypes } from "./redux-store";



const types = {
    ADD_MESSAGE: 'gp-network/dialogs/ADD-MESSAGE' as 'gp-network/dialogs/ADD-MESSAGE',
    DELETE_MESSAGE: 'gp-network/dialogs/DELETE_MESSAGE' as 'gp-network/dialogs/DELETE_MESSAGE'
}
let initialState = {
    dialogData: [
        { id: 1, name: "Gennadij" },
        { id: 2, name: "Sergey" },
        { id: 3, name: "Alexey" },
        { id: 4, name: "Anton" },
        { id: 5, name: "Jhon" },
        { id: 6, name: "David" }
    ] as Array<DialogDataType>,
    messageData: [
        { id: 2, idMessage: 1, name: "Sergey", text: "Hi, I have a request from the customer" },
        { id: 1, idMessage: 2, name: "Gennadij", text: "happy to hear" },
        { id: 2, idMessage: 3, name: "Sergey", text: "What is your plans?" },
        { id: 1, idMessage: 4, name: "Gennadij", text: "preparation" }
    ] as Array<MessageDataType>,
};

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {


    switch (action.type) {

        case types.ADD_MESSAGE:

            let idMessage = state.messageData.length + 1

            return {
                ...state,
                messageData: [...state.messageData, { id: 1, idMessage: idMessage, name: "Gennadij", text: action.newText }]
            };

        case types.DELETE_MESSAGE:

            return {
                ...state,
                messageData: state.messageData.filter(m => m.idMessage !== action.messageId)
            };
        default:
            return state;

    }
}
/* Создание объектов action */

export const actions = {
    sendMessage: (newText: string) => ({ type: types.ADD_MESSAGE, newText }) as const,
    deleteMessage: (messageId: number) => ({ type: types.DELETE_MESSAGE, messageId }) as const
}

export default dialogsReducer

export type InitialStateType = typeof initialState
type ActionsTypes = ReturnType<InferActionsTypes<typeof actions>>