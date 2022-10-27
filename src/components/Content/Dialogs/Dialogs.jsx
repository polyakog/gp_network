import React from 'react';
import css from './Dialogs.module.css';
import DialogItem from './DialogItems/DialogItems';
import MessageItem from './MessageItems/MessageItems';
import { reduxForm, Field } from 'redux-form';



                     /* Выполнение UI (user Interface) */

const Dialogs = (props) => {

                    /* Обработка массива, чтобы исключить повторения. */
                    /* Автоматически данные заносятся в новый массив из старого  */
   
    let dialogElements = props.dialogsPage.dialogData.map(d => (<DialogItem key={d.id} id={d.id} name={d.name} />));
    let messageElements = props.dialogsPage.messageData.map(m => (<MessageItem key={m.idMessage} id={m.id} name={m.name} text={m.text} />));
    

    const addNewMessage =(value) => {
        props.sendMessage(value.newMessageText);
        // console.log(props.dialogsPage.messageData)
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
                        <AddMessageFormRedux onSubmit={addNewMessage}/>
                    </div>
                </div>
            </div>
    )}

const AddMessageForm = (props) =>{
    return (
        <form className = { css.onSendMessageClick } onSubmit={props.handleSubmit} >
            <Field name='newMessageText'  component='textarea' className={css.NewMessagetTextarea} rows='4' placeholder='Enter your message'/>
            <button className={css.newMessageButton} >Send message</button>

        </form >
    )
}

const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm)

export default Dialogs;