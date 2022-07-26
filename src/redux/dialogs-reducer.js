const ADD_MESSAGE = 'ADD-MESSAGE'
const DELETE_MESSAGE = 'DELETE_MESSAGE'


let initialState = {
    dialogData: [
        { id: 1, name: "Gennadij" },
        { id: 2, name: "Sergey" },
        { id: 3, name: "Alexey" },
        { id: 4, name: "Anton" },
        { id: 5, name: "Jhon" },
        { id: 6, name: "David" }
    ],

    messageData: [
        { id: 2, idMessage: 1, name: "Sergey", text: "Hi, I have a request from the customer" },
        { id: 1, idMessage: 2, name: "Gennadij", text: "happy to hear" },
        { id: 2, idMessage: 3, name: "Sergey", text: "What is your plans?" },
        { id: 1, idMessage: 4, name: "Gennadij", text: "preparation" }
    ],

};

export const testMessageState = (initialState) => ({ initialState })

const dialogsReducer = (state = initialState, action) => {


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
export const sendMessageActionCreator = (newText) => ({ type: ADD_MESSAGE, newText })
export const deleteMessage = (messageId) => ({ type: DELETE_MESSAGE, messageId })


export default dialogsReducer