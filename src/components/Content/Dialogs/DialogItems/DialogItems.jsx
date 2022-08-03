import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './../Dialogs.module.css';


                        /* Выносим стрелочную функцию (работает как шаблон действий) */
        const DialogItem = (props) => {
            return (
                <NavLink className={({ isActive }) => (isActive ? (css.dialog + " " + css.active) : css.dialog)} to={'/dialogs/' + props.id}>
                    {props.name}
                </NavLink>
            )
        }


export default DialogItem;