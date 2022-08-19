import profileReducer from "./profile-reducer"
import dialogsReducer from "./dialogs-reducer"
import sidebarReducer from "./sidebar-reducer"


let store = {

    /* Базы данных в объекте state*/
    _state: {

        profilePage: {
            postData: [
                { id: 1, message: 'Very interesting', likeCount: 21, Name: 'Alexey' },
                { id: 2, message: 'How to add data?', likeCount: 2, Name: 'Anton' },
                { id: 3, message: 'finally. It is a new good network', likeCount: 51, Name: 'Peter' },
                { id: 4, message: "I'm agree", likeCount: 41, Name: 'Martin' },
                { id: 5, message: 'We can share info here', likeCount: 44, Name: 'Alexey' },
                { id: 6, message: 'I will upload all data', likeCount: 53, Name: 'Gennadij' }
            ],

            newPostText: 'Enter your first post ',
        },

        dialogsPage: {
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
        },

        sidebar: {

            friendsData: {
                friendsId1: [
                    { id: 2, name: "Sergey" },
                    { id: 3, name: "Alexey" },
                    { id: 5, name: "Dhaval" },
                ],
                friendsId2: [
                    { id: 1, name: "Gennadij" },
                    { id: 4, name: "Anton" },
                    { id: 3, name: "Alexey" },
                ],

            }


        },

    },

    /* Задаем пустую функцию для присвоение ей потом перерисовки. Если нет присвоения, то будет виндоу.алерт */
    _callSubscriber() {
        window.alert("Error: state was changed but not rerendered")
    },

    getState() {
        return this._state;
    },

    /* Передается функция rerender (через свойство observer) и она присваиватся пустой функции rerenderState  */
    subscribe(observer) {
        this._callSubscriber = observer; /* патерн observer */
    },


    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    },

}


export default store;