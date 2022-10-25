import { createStore, combineReducers, applyMiddleware } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import ThunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
 


let reducers = combineReducers({
    auth: authReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    form : formReducer,
    
}); 

const store = createStore(reducers, applyMiddleware(ThunkMiddleware));

window.store = store;


export default store
