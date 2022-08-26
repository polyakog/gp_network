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

    let stateCopy;
    
    switch (action.type) {
        case ADD_MESSAGE: 
            let newMessage = {
                id: 1,
                name: "Gennadij",
                text: state.newMessageText
            };

            // stateCopy={...state};
                /* Разные способы добавления: */
                /* 1 способ - через пуш */
            // stateCopy.messageData=[...state.messageData];
            // stateCopy.messageData.push(newMessage);
                /* 2 способ - через конкат */
            // stateCopy.messageData = state.messageData.concat (newMessage);
                /* 3 способ - просто добавить в нужное место newMessage */
            stateCopy = { ...state,
                newMessageText: 'next message',
                messageData: [...state.messageData, newMessage]           
            };
            
                        
            return stateCopy;

        case UPDATE_NEW_MESSAGE_TEXT: 
            stateCopy = { ...state,
            newMessageText: action.newText
            }
          
            return stateCopy;
    
        default:
            return state;
    }


}

            /* Создание объектов action */
export const sendMessageActionCreator = () => ({ type: ADD_MESSAGE })

export const updateNewMessageTextActionCreator = (text) =>
    ({ type: UPDATE_NEW_MESSAGE_TEXT, newText: text })


export default dialogsReducer