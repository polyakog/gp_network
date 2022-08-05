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
        ]
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
        ]
    },

    sidebar: {

        friendsData: {
            friendsId1: [
               { id: 2, name: "Sergey"}, 
                { id: 3, name: "Alexey"}, 
                { id: 5, name: "Dhaval"}, 
            ],
            friendsId2: [
                { id: 1, name: "Gennadij" },
                { id: 4, name: "Anton" },
                { id: 3, name: "Alexey" },
            ],

        }
        
        
    },
            
    

    }




export default state;