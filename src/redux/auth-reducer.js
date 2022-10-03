const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const SET_USER_DATA = 'SET_USER_DATA'
const SET_USER_PHOTO = 'SET_USER_PHOTO'


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false,
    userPhoto: null

};


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            };
debugger
        case SET_USER_PHOTO:
            return {
                ...state,
                userPhoto: action.userPhoto,
            };


        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }


        


        default:
            return state;


    }
}

export const setAuthUserData = (userId, email, login) => ({ type: SET_USER_DATA, data: {userId, email, login} })

export const setAuthUserPhoto = (userPhoto) => ({ type: SET_USER_PHOTO, userPhoto })

export const authToggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })


export default authReducer;