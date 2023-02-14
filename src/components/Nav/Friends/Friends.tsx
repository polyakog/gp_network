import React from "react";
import css from './Friends.module.css';
import { NavLink } from 'react-router-dom';

type PropsType = {
   Id:number
   name:string 
}
const Friends: React.FC<PropsType> = (props) => {
    return (
        <div className={css.friends}>
            <NavLink className={css.user} to={'/users/' + props.Id}>
                <img src="https://cdn1.flamp.ru/1ade70d2f2f936f3ced673e84d129204.jpg" alt="" />
                <div className={css.userName}>{props.name} ({props.Id})</div>
            </NavLink>
        </div>
    );
}

export default Friends;