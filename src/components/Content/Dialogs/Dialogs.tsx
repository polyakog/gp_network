import React, { useEffect, useState } from 'react';
import css from './Dialogs.module.css';
import DialogItem from './DialogItems/DialogItems';
import MessageItem from './MessageItems/MessageItems';
import AddMessageForm from '../../common/Forms/AddMessageForm';
import { InitialStateType } from '../../../redux/dialogs-reducer';
import { DialogsResponseType, MessageItemsType } from '../../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { getDialogs, getMessages } from '../../../redux/dialogApi-selectors';
import { AppDispatchType } from '../../../redux/redux-store';
import { requestDialogs, requestMessages } from '../../../redux/dialogsApi-reducer';

type PropsType = {
    dialogsPage: InitialStateType
    setDialogs: (dialogs: DialogsResponseType[]) => void
    setMessages: (messages: MessageItemsType[]) => void
    sendMessage: (newMessageText: string) => void
}

export type NewMessageFormType = {
    newMessageText: string

}

export type SelectedUserType = {
    name: string
    userId: number
}



const Dialogs: React.FC<PropsType> = ({ dialogsPage, setDialogs, setMessages, sendMessage }) => {

    const dialogs = useSelector(getDialogs)
    const messages = useSelector(getMessages)
    const [selectedUser, setSelectedUser] = useState<SelectedUserType | null>(null)
    const dispatch: AppDispatchType = useDispatch()

    useEffect(() => {
        dispatch(requestDialogs())

    }, [])

    useEffect(() => {
        if (!!selectedUser) dispatch(requestMessages(selectedUser.userId))
    }, [selectedUser])

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
            onUserSelected={setSelectedUser}
            selectedUser={selectedUser}
        />
    ));
    let messageElements = messages.map(m => (
        <MessageItem
            key={m.id}
            id={m.id}
            body={m.body}
            translatedBody={m.translatedBody}
            addedAt={m.addedAt}
            senderId={m.senderId}
            senderName={m.senderName}
            recipientId={m.recipientId}
            viewed={m.viewed}
        />
    ));

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
                    <h4>Messages</h4>
                    
                    {messageElements}
                    <AddMessageForm onSubmit={addNewMessage} />
                </div>
            </div>
        </div>
    )
}

export default Dialogs;