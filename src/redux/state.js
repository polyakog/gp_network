let store = {
   
    
    /* Задаем пустую функцию для присвоение ей потом перерисовки. Если нет присвоения, то будет алерт */
_callSubscriber () {
    window.alert ("Error: state was changed but not rerendered")
},


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
        
        newMessageText: 'Enter your message',
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

getState () {
    return this._state;
},


addPost () {
    let newPost= { 
        id: 7, 
        message: this._state.profilePage.newPostText, 
        ikeCount: 0, 
        Name: 'Michail'
    };
    this._state.profilePage.postData.push(newPost);
    this._state.profilePage.newPostText = 'Enter your next post';
    this._callSubscriber(this._state);  
    
},

updateNewPostText (newText) {
    this._state.profilePage.newPostText = newText; 
    this._callSubscriber(this._state);  

},

addMessage () {
    let newMessage = { 
        id: 1, 
        name: "Gennadij", 
        text: this._state.dialogsPage.newMessageText };
    this._state.dialogsPage.messageData.push(newMessage);
    this._state.dialogsPage.newMessageText = 'next message';
    this._callSubscriber(this._state);
},

updateNewMessageText (newText) {
    this._state.dialogsPage.newMessageText = newText;
    this._callSubscriber(this._state);
},

    /* Передается функция rerender (через свойство observer) и она присваиватся пустой функции rerenderState  */
transferFunction (observer) {
    this._callSubscriber = observer; /* патерн observer */
},

}



// export default state;
export default store;