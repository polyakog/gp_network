import React from 'react';
import css from './Dialogs.module.css';
import DialogItem from './DialogItems/DialogItems';
import MessageItem from './MessageItems/MessageItems';
import { Navigate } from 'react-router-dom';


                     /* Выполнение UI (user Interface) */

const Dialogs = (props) => {

                    /* Обработка массива, чтобы исключить повторения. */
                    /* Автоматически данные заносятся в новый массив из старого  */
   
    let dialogElements = props.dialogsPage.dialogData.map(d => (<DialogItem key={d.id} id={d.id} name={d.name} />));
    let messageElements = props.dialogsPage.messageData.map(m => (<MessageItem key={m.id} id={m.id} name={m.name} text={m.text} />));
    

let onSendMessageClick = () => {
   props.sendMessage();
}

let onMessageChange = (e) => {
    let text = e.target.value;
    props.updateNewMessageText(text);
}
        
    if (!props.isAuth) return <Navigate to='/login'/>

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
                        <div className={css.onSendMessageClick}>
                            <textarea className={css.NewMessagetText} rows="4" onChange={onMessageChange} value={props.dialogsPage.newMessageText} placeholder='Enter your message'/>
                            <button className={css.newMessageButton} onClick={onSendMessageClick}>Send message</button>

                        </div>
                    </div>
                    


                </div>
            </div>
    )
}

export default Dialogs;