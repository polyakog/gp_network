import React from 'react';
import { NavLink } from 'react-router-dom';
import userPhoto from '../../../../assets/images/noPic.jpg'
import css from './../Dialogs.module.css';


type PropsType = {
    name: string
    id: number    
}                 

const DialogItem: React.FC<PropsType> = (props) => {
            return (
                <div>
                    

                  <NavLink className={({ isActive }) => (isActive ? (css.dialog + " " + css.active) : css.dialog)} to={'/dialogs/' + props.id}>
                        <div className={css.user}>
                            <img src={userPhoto} alt="" />
                            <span>{props.name}</span>
                        </div>
                    
                </NavLink> 

                </div>
                
            )
        }


export default DialogItem;