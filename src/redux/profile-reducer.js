const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

let initialState = {
    postData: [
        { id: 1, message: 'Very interesting', likeCount: 21, Name: 'Alexey' },
        { id: 2, message: 'How to add data?', likeCount: 2, Name: 'Anton' },
        // { id: 3, message: 'finally. It is a new good network', likeCount: 51, Name: 'Peter' },
        // { id: 4, message: "I'm agree", likeCount: 41, Name: 'Martin' },
        // { id: 5, message: 'We can share info here', likeCount: 44, Name: 'Alexey' },
        // { id: 6, message: 'I will upload all data', likeCount: 53, Name: 'Gennadij' }
    ],

    newPostText: 'Enter your first post ',
};


const profileReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 7,
                message: state.newPostText,
                likeCount: 0,
                Name: 'Michail'
            };
            
            state.postData.push(newPost);
            state.newPostText = 'Enter your next post';
            return state;    

        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            return state;
            
    
        default:
            return state;
            
    }

    

}

/* Создание объектов action */
export const addPostActionCreator = () => {
    return {
        type: ADD_POST
    }

}

export const updateNewPostTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    };
}




export default profileReducer