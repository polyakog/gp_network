import React from 'react';
import css from './Dialogs.module.css';
import DialogItem from './DialogItems/DialogItems';
import MessageItem from './MessageItems/MessageItems';
import AddMessageForm from '../../common/Forms/AddMessageForm';
import { InitialStateType } from '../../../redux/dialogs-reducer';

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (newMessageText: string) => void
}

export type NewMessageFormType = {
    newMessageText: string
   
}



const Dialogs: React.FC<PropsType> = ({ dialogsPage, sendMessage }) => {

    let dialogElements = dialogsPage.dialogData.map(d => (<DialogItem key={d.id} id={d.id} name={d.name} />));
    let messageElements = dialogsPage.messageData.map(m => (<MessageItem key={m.idMessage} id={m.id} name={m.name} text={m.text} />));

    const addNewMessage = (values: NewMessageFormType) => {
        sendMessage(values.newMessageText);
    }

    return (
        <div className={css.wrapper} >
            <h2> Dialog window</h2>

            <div className={css.dialogWindow}>
                <div className={css.dialogs}>
                    Dialogs
                    <p></p>
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