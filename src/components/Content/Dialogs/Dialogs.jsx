import React from 'react';
import css from './Dialogs.module.css';
import DialogItem from './DialogItems/DialogItems';
import MessageItem from './MessageItems/MessageItems';




                     /* Выполнение UI (user Interface) */

const Dialogs = (props) => {

                    /* Обработка массива, чтобы исключить повторения. */
                    /* Автоматически данные заносятся в новый массив из старого  */
   
    let dialogElements = props.dialogsPage.dialogData.map (d => (<DialogItem id={d.id} name={d.name} />));
    let messageElements = props.dialogsPage.messageData.map(m => (<MessageItem id={m.id} name={m.name} text={m.text} />));
    
let newMessageElement = React.createRef ();

let addMessage = () => {
    props.addMessage();
}

let onMessageChange = () => {
    let text = newMessageElement.current.value;
    props.updateNewMessageText(text);
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
                        <div className={css.addMessage}>
                            <textarea className={css.NewMessagetText} rows="4" ref={newMessageElement} onChange={onMessageChange} value={props.dialogsPage.newMessageText}/>
                            <button className={css.newMessageButton} onClick={addMessage}>Add message</button>

                        </div>
                    </div>
                    


                </div>
            </div>
    )
}

export default Dialogs;