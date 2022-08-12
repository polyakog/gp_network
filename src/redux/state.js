let store = {
   
    
    /* Задаем пустую функцию для присвоение ей потом перерисовки. Если нет присвоения, то будет алерт */
rerenderState () {
    window.alert ("Error: state was changed but not rerendered")
},


/* Базы данных в объекте state*/

state: {

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
    let newPost= { id: 7, message: this.state.profilePage.newPostText, likeCount: 0, Name: 'Michail'};
    this.state.profilePage.postData.push(newPost);
    this.state.profilePage.newPostText = 'Enter your next post';
    this.rerenderState(this.state);  
    
},

updateNewPostText (newText) {
    this.state.profilePage.newPostText = newText; 
    this.rerenderState(this.state);  

},

addMessage () {
    let newMessage = { id: 1, name: "Gennadij", text: this.state.dialogsPage.newMessageText };
    this.state.dialogsPage.messageData.push(newMessage);
    this.state.dialogsPage.newMessageText = 'next message';
    this.rerenderState(this.state);
},

updateNewMessageText (newText) {
    this.state.dialogsPage.newMessageText = newText;
    this.rerenderState(this.state);
},

    /* Передается функция rerender (через свойство observer) и она присваиватся пустой функции rerenderState  */
transferFunction (observer) {
    this.rerenderState = observer; /* патерн observer */
},

}



// export default state;
export default store;