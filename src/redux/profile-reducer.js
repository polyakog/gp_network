const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'

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
    profile: null,
};


const profileReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 7,
                message: state.newPostText,
                likeCount: 0,
                Name: 'Michail'
            };
            let stateCopy = {...state};
            stateCopy.postData = [...state.postData] 
            stateCopy.postData.push(newPost);
            stateCopy.newPostText = 'Enter your next post';
            return stateCopy; 
        }   

        case UPDATE_NEW_POST_TEXT: {
            let stateCopy = { ...state };
            stateCopy.newPostText = action.newText;
            return stateCopy;
        }

        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
          
             
    
        default:
            return state;
            
    }

    

}

/* Создание объектов action */
export const addPostActionCreator = () => ( {type: ADD_POST })
export const updateNewPostTextActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })




export default profileReducer