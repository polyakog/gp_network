import React from 'react';
import css from './Dialogs.module.css';
import DialogItem from './DialogItems/DialogItems';
import MessageItem from './MessageItems/MessageItems';
// import { dialogData, messageData } from './../../../index';



                     /* Выполнение UI (user Interface) */

const Dialogs = (props) => {

                    /* Обработка массива, чтобы исключить повторения. */
                    /* Автоматически данные заносятся в новый массив из старого  */
    let dialogElements = props.state.dialogData.map (d => (<DialogItem id={d.id} name={d.name} />))
    let messageElements = props.state.messageData.map(m => (<MessageItem id={m.id} name={m.name} text={m.text} />))

        
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
                    </div>


                </div>
            </div>
    )
}

export default Dialogs;