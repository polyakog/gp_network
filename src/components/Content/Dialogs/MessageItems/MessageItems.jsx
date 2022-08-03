import React from 'react';
import css from './../Dialogs.module.css';


                         /* Выносим стрелочную функцию (работает как шаблон действий) */
        const MessageItem = (props) => {
            return (
                <div className={css.message}>
                    {props.name} (ID{props.id}): {props.text}
                </div>
            )
        }   

export default MessageItem;