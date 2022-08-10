import { rerender } from './../render';

/* Базы данных в объекте state*/

let state = {

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

}


export let addPost = () => {

    let newPost = { id: 7, message: state.profilePage.newPostText, likeCount: 0, Name: 'Michail'};
    state.profilePage.postData.push(newPost);
    state.profilePage.newPostText = 'Enter your next post';
    rerender(state);        
}

export let updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText; 
    rerender(state);  
}

export let addMessage = () => {
    let newMessage = { id: 1, name: "Gennadij", text: state.dialogsPage.newMessageText };
    state.dialogsPage.messageData.push(newMessage);
    state.dialogsPage.newMessageText = 'next message';
    rerender(state);
}

export let updateNewMessageText = (newText) => {
    state.dialogsPage.newMessageText = newText;
    rerender(state);
}


export default state;