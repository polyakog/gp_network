import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Dialogs.module.css';

const DialogData = (props) => {
    return (
        <NavLink className={({ isActive }) => (isActive ? (css.dialog + " " + css.active) : css.dialog)} to={'/dialogs/'+props.id}>{props.name}</NavLink>

    )
}

const MessageData = (props) => {
    return (
                 <div className={css.message}>{props.text}</div>
    )
}


const Dialogs = (props) => {
    return (
        <div className={css.wrapper} >
            <h2> Dialog window</h2> 
            
            <div className={css.dialogWindow}>
                <div className={css.dialogs}>
                        Dialogs
                        <p></p>
                    <DialogData id="1" name="Gennadij"/>
                    <DialogData id="2" name="Alexey"/>
                    <DialogData id="3" name="Sergey"/>
                    <DialogData id="4" name="Anton"/>
                    <DialogData id="5" name="Dhaval"/>
                    <DialogData id="6" name="David"/>

                    
                </div>

                <div className={css.messages}>
                        Messages
                        <p></p>
                    <MessageData id="1" name="Gennadij" text="Hi, I have a request from the customer" />
                    <MessageData id="1" name="Gennadij" text="happy to hear" />
                    <MessageData id="1" name="Gennadij" text="What is your plans?" />
                    <MessageData id="1" name="Gennadij" text="preparation" /> 
                    
                </div>
                    

            </div>
        </div>
    )
}

export default Dialogs;