const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'


let initialState = {
    dialogData: [
        { id: 1, name: "Gennadij" },
        { id: 2, name: "Sergey" },
        { id: 3, name: "Alexey" },
        { id: 4, name: "Anton" },
        { id: 5, name: "Dhaval" },
        { id: 6, name: "David" }
    ],

    messageData: [
        { id: 2, name: "Sergey", text: "Hi, I have a request from the customer" },
        { id: 1, name: "Gennadij", text: "happy to hear" },
        { id: 2, name: "Sergey", text: "What is your plans?" },
        { id: 1, name: "Gennadij", text: "preparation" }
    ],

    newMessageText: '',
};

const dialogsReducer = (state = initialState, action) => {
    debugger
    switch (action.type) {
        case ADD_MESSAGE: {
            let newMessage = {
                id: 1,
                name: "Gennadij",
                text: state.newMessageText
            };


            let newState={...state};
            newState.messageData=[...state.messageData];
            newState.messageData.push(newMessage);
            newState.newMessageText = 'next message';
            
            return newState;}

        case UPDATE_NEW_MESSAGE_TEXT: {
            let newState = { ...state }
            newState.newMessageText = action.newText;
            return newState;}
    
        default:
            return state;
    }


}

            /* Создание объектов action */
export const sendMessageActionCreator = () => ({ type: ADD_MESSAGE })

export const updateNewMessageTextActionCreator = (text) =>
    ({ type: UPDATE_NEW_MESSAGE_TEXT, newText: text })


export default dialogsReducer