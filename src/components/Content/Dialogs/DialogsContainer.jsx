import React from 'react';

import { sendMessageActionCreator, updateNewMessageTextActionCreator } from '../../../redux/dialogs-reducer';
import Dialogs from './Dialogs';

/* Выполнение контейнера для презентационной компоненты UI (user Interface) */

const DialogsContainer = (props) => {
    
    let dialogsPage = props.store.getState().dialogsPage;

    let onSendMessage = () => {
        props.store.dispatch(sendMessageActionCreator());
    }

    let onMessageChange = (text) => {
        props.store.dispatch(updateNewMessageTextActionCreator(text));
    }
debugger
   return ( <Dialogs 
       dialogsPage={dialogsPage}
        sendMessage ={onSendMessage}
        updateNewMessageText={onMessageChange} />)

}



export default DialogsContainer;