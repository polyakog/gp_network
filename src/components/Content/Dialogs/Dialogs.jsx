import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Dialogs.module.css';


                        /* Выносим стрелочную функцию (работает как шаблон действий) */
        const DialogItem = (props) => {
            return (
                <NavLink className={({ isActive }) => (isActive ? (css.dialog + " " + css.active) : css.dialog)} to={'/dialogs/' + props.id}>
                    {props.name}
                </NavLink>

            )
        }

                        /* Выносим стрелочную функцию (работает как шаблон действий) */
        const MessageItem = (props) => {
            return (
                <div className={css.message}>
                    {props.name} (ID{props.id}): {props.text}
                </div>
            )
        }   


                     /* Выполнение UI (user Interface) */
const Dialogs = (props) => {

                    /* Базы данных */
            let dialogData = [
                { id: 1, name: "Gennadij" },
                { id: 2, name: "Alexey" },
                { id: 3, name: "Sergey" },
                { id: 4, name: "Anton" },
                { id: 5, name: "Dhaval" },
                { id: 6, name: "David" }
            ]

            let messageData = [
                { id: 3, name: "Sergey", text: "Hi, I have a request from the customer" },
                { id: 1, name: "Gennadij", text: "happy to hear" },
                { id: 3, name: "Sergey", text: "What is your plans?" },
                { id: 1, name: "Gennadij", text: "preparation" }
            ]


                    /* Обработка массива, чтобы исключить повторения. */
                    /* Автоматически данные заносятся в новый массив из старого  */
    let dialogElements  = dialogData.map (d => (<DialogItem id={d.id} name={d.name} />))
    let messageElements = messageData.map(m => (<MessageItem id={m.id} name={m.name} text={m.text} />))

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