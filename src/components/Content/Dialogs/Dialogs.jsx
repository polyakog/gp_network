import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Dialogs.module.css';

const DialogData = (props) => {
    return (
        <NavLink className={({ isActive }) => (isActive ? (css.dialog + " " + css.active) : css.dialog)} to={'/dialogs/'+props.id}>{props.name}</NavLink>

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
                    <div className={css.message}>Hi, I have a request from the customer</div> 
                    <div className={css.message}>happy to hear</div> 
                </div>
                    

            </div>
        </div>
    )
}

export default Dialogs;