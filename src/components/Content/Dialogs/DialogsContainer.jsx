import React from 'react';

import { sendMessageActionCreator, updateNewMessageTextActionCreator } from '../../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import StoreContext from './../../../StoreContext';

/* Выполнение контейнера для презентационной компоненты UI (user Interface) */

const DialogsContainer = (props) => {

    return <StoreContext.Consumer> 
            { 
            store => {

                let dialogsPage = store.getState().dialogsPage;

                let onSendMessage = () => {
                    store.dispatch(sendMessageActionCreator());
                }

                let onMessageChange = (text) => {
                    store.dispatch(updateNewMessageTextActionCreator(text));
                }

                return <Dialogs
                    dialogsPage={dialogsPage}
                    sendMessage={onSendMessage}
                    updateNewMessageText={onMessageChange} />

            }
        }
        </StoreContext.Consumer>
    

}



export default DialogsContainer;