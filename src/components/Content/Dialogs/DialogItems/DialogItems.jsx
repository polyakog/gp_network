import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './../Dialogs.module.css';


                        /* Выносим стрелочную функцию (работает как шаблон действий) */
        const DialogItem = (props) => {
            return (
                <div>
                    

                  <NavLink className={({ isActive }) => (isActive ? (css.dialog + " " + css.active) : css.dialog)} to={'/dialogs/' + props.id}>
                        <div className={css.user}>
                            <img src="https://cdn1.flamp.ru/1ade70d2f2f936f3ced673e84d129204.jpg" alt="" />
                            <span>{props.name}</span>
                        </div>
                    
                </NavLink> 

                </div>
                
            )
        }


export default DialogItem;