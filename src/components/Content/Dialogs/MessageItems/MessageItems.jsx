import React from 'react';
import css from './../Dialogs.module.css';


                         /* Выносим стрелочную функцию (работает как шаблон действий) */
        const MessageItem = (props) => {

          

            return (
                
                <div className={css.message}>
                    <div >
                    {/* <div className={({props.name}) => (props.name = "Gennadij" ? (css.message + " " + css.activeM) : css.message)}> */}
                         

                        <img src="https://cdn1.flamp.ru/1ade70d2f2f936f3ced673e84d129204.jpg" alt="" />
                        <span> {props.name} (ID{props.id}):{props.text} </span>
                          
                    </div>
                    
                </div>
            )
        }   

export default MessageItem;