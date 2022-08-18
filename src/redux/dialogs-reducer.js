const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

const dialogsReducer = (state,action) =>{
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 1,
                name: "Gennadij",
                text: state.newMessageText
            };
            state.messageData.push(newMessage);
            state.newMessageText = 'next message';
            
            return state;

        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newText;
            return state;
    
        default:
            return state;
    }


}

            /* Создание объектов action */
export const sendMessageActionCreator = () => ({ type: ADD_MESSAGE })

export const updateNewMessageTextActionCreator = (text) =>
    ({ type: UPDATE_NEW_MESSAGE_TEXT, newText: text })


export default dialogsReducer