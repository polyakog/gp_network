import React, { useEffect } from 'react';
import css from './Dialogs.module.css';
import DialogItem from './DialogItems/DialogItems';
import MessageItem from './MessageItems/MessageItems';
import AddMessageForm from '../../common/Forms/AddMessageForm';
import { InitialStateType } from '../../../redux/dialogs-reducer';
import { DialogsResponseType, MessageItemsType } from '../../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { getDialogs } from '../../../redux/dialogApi-selectors';
import { AppDispatchType } from '../../../redux/redux-store';
import { requestDialogs } from '../../../redux/dialogsApi-reducer';

type PropsType = {
    dialogsPage: InitialStateType
    setDialogs: (dialogs: DialogsResponseType[]) => void
    setMessages: (messages: MessageItemsType[]) => void
    sendMessage: (newMessageText: string) => void
}

export type NewMessageFormType = {
    newMessageText: string

}



const Dialogs: React.FC<PropsType> = ({ dialogsPage, setDialogs, setMessages, sendMessage }) => {

    const dialogs = useSelector(getDialogs)
    const dispatch: AppDispatchType = useDispatch()

    useEffect(() => {
        dispatch(requestDialogs())

    }, [])

    let dialogElements = dialogs.map(d => (
        <DialogItem
            key={d.id}
            id={d.id}
            userName={d.userName}
            hasNewMessages={d.hasNewMessages}
            lastDialogActivityDate={d.lastDialogActivityDate}
            lastUserActivityDate={d.lastUserActivityDate}
            newMessagesCount={d.newMessagesCount}
            photos={d.photos}
        />
    ));
    let messageElements = dialogsPage.messageData.map(m => (<MessageItem key={m.idMessage} id={m.id} name={m.name} text={m.text} />));

    const addNewMessage = (values: NewMessageFormType) => {
        sendMessage(values.newMessageText);
    }

    return (
        <div className={css.wrapper} >
            <h1> Dialog page</h1>

            <div className={css.dialogWindow}>
                <div className={css.dialogs}>
                    <h4>Dialogs</h4>
                    
                    {dialogElements}
                </div>

                <div className={css.messages}>
                    Messages
                    <p></p>
                    {messageElements}
                    <AddMessageForm onSubmit={addNewMessage} />
                </div>
            </div>
        </div>
    )
}

export default Dialogs;