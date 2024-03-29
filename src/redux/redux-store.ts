import { combineReducers, applyMiddleware, compose, Action } from "redux";
import { legacy_createStore as createStore } from 'redux'
import profileReducer from "./profile-reducer";
import dialogsReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import ThunkMiddleware, { ThunkAction } from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";
import chatReducer from "./chat-reducer";
import dialogsApiReducer from "./dialogsApi-reducer";



let rootReducer = combineReducers({
    auth: authReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer,
    dialogsApiPage: dialogsApiReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>

export type AppDispatchType = typeof store.dispatch

export type InferActionsTypes<T> = T extends { [key: string]: infer U } ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(ThunkMiddleware)));
//@ts-ignore
window.__store__ = store;


export default store
