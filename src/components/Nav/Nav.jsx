import React from "react";
import css from './Nav.module.css';
import { NavLink } from 'react-router-dom';



const Nav = () => {
    
    return (
        <nav className={css.nav}>
            
                {/* <div ><a className={`${css.profile_link} ${css.active}`} href="/profile">Profile</a></div>
                <div ><a className={css.profile_link} href="/dialogs">Messages</a></div>
                <div ><a className={css.profile_link} href="/news">News</a></div>
                <div ><a className={css.profile_link} href="/music">Music</a></div>
                <br />
                <div ><a className={css.profile_link} href="/settings">Settings</a></div> */}
            <div className={css.links}>
               
                <NavLink className={({ isActive }) => (isActive ? css.activeLink : css.link)} to="/profile"> Profile </NavLink>
                <NavLink className={({ isActive }) => (isActive ? css.activeLink : css.link)} to="/dialogs"> Messages </NavLink>
                <NavLink className={({ isActive }) => (isActive ? css.activeLink : css.link)} to="/news"> News </NavLink>
                <NavLink className={({ isActive }) => (isActive ? css.activeLink : css.link)} to="/music"> Music </NavLink>
                <br />
                <NavLink className={({ isActive }) => (isActive ? css.activeLink : css.link)} to="/settings"> Settings </NavLink>
                          


            </div>
        </nav>
    );
}

export default Nav;