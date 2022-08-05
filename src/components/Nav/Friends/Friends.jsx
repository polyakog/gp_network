import React from "react";
import css from './Friends.module.css';
import { NavLink } from 'react-router-dom';


const Friends = (props) => {


    return (
       

            <div className={css.friends}>
                <NavLink className={css.user} to={'/users/' + props.id}>
                    
                        <img src="https://cdn1.flamp.ru/1ade70d2f2f936f3ced673e84d129204.jpg" alt="" />
                        <div className={css.userName}>{props.name}</div>
                    
                    
                </NavLink>
                

            </div>

        
    );
}

export default Friends;