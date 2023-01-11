import { combineReducers, applyMiddleware, compose } from "redux";
import { legacy_createStore as createStore } from 'redux'
import profileReducer from "./profile-reducer.ts";
import dialogsReducer from './dialogs-reducer.ts';
import sidebarReducer from './sidebar-reducer';
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer.ts";
import ThunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer.ts";
 


let reducers = combineReducers({
    auth: authReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    form : formReducer,
    app:appReducer
    
}); 

// const store = createStore (reducers, applyMiddleware(ThunkMiddleware));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(ThunkMiddleware)));
window.__store__ = store;


export default store
