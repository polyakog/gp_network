import React from "react";
import css from './Nav.module.css';
import { NavLink } from 'react-router-dom';
import Friends from './Friends/Friends';



const Nav = (props) => {

    let friendElements = props.friendsData.friendsId1.map(d => (<Friends id={d.id} name={d.name} />))
    
    return (
        <nav className={css.nav}>
            
            <div className={css.links}>
               
                <NavLink className={({ isActive }) => (isActive ? css.activeLink : css.link)} to="/profile"> Profile </NavLink>
                <NavLink className={({ isActive }) => (isActive ? css.activeLink : css.link)} to="/dialogs"> Messages </NavLink>
                <NavLink className={({ isActive }) => (isActive ? css.activeLink : css.link)} to="/news"> News </NavLink>
                <NavLink className={({ isActive }) => (isActive ? css.activeLink : css.link)} to="/music"> Music </NavLink>
                <br />
                <NavLink className={({ isActive }) => (isActive ? css.activeLink : css.link)} to="/users"> Users </NavLink>
                <NavLink className={({ isActive }) => (isActive ? css.activeLink : css.link)} to="/settings"> Settings </NavLink>
                
                   
            </div>
            <div className={css.friends}>
                <h1>My Friends</h1>
                {friendElements}
                
                
            </div>
                
        </nav>
    );
}

export default Nav;