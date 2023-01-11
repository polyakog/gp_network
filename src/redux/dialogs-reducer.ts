const ADD_MESSAGE = 'gp-network/dialogs/ADD-MESSAGE'
const DELETE_MESSAGE = 'gp-network/dialogs/DELETE_MESSAGE'

// export type InitialStateType = {
//     dialogData: Array<{ id: number, name: string }>
//     messageData: Array<{ id: number, idMessage: number, name: string, text: string }>
// }

type DialogDataType = { id: number, name: string}
type MessageDataType = { id: number, idMessage: number, name: string, text: string }

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

export type InitialStateType = typeof initialState

export const testMessageState = (initialState: InitialStateType) => ({ initialState })

const dialogsReducer = (state = initialState, action: any): InitialStateType => {


    switch (action.type) {

        case ADD_MESSAGE:

            let idMessage = state.messageData.length + 1

            return {
                ...state,
                messageData: [...state.messageData, { id: 1, idMessage: idMessage, name: "Gennadij", text: action.newText }]
            };

        case DELETE_MESSAGE:

            return {
                ...state,
                messageData: state.messageData.filter(m => m.idMessage !== action.messageId)
            };
        default:
            return state;

    }
}

/* Создание объектов action */
type SendMessageActionType = {
    type: typeof ADD_MESSAGE
    newText: string
}
export const sendMessageActionCreator = (newText: string): SendMessageActionType => ({ type: ADD_MESSAGE, newText })

type DeleteMessageActionType = {
    type: typeof DELETE_MESSAGE
    messageId: number
}
export const deleteMessage = (messageId: number): DeleteMessageActionType => ({ type: DELETE_MESSAGE, messageId })

export default dialogsReducer