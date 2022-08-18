const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

const profileReducer = (state, action) => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 7,
                message: state.newPostText,
                ikeCount: 0,
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