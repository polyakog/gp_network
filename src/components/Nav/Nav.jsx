import React from "react";
import css from './Nav.module.css';
import { Link } from 'react-router-dom';


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
                <Link className={css.profile_link} to="/profile"> Profile </Link>
                <Link className={css.profile_link} to="/dialogs"> Messages </Link>
                <Link className={css.profile_link} to="/news"> News </Link>
                <Link className={css.profile_link} to="/music"> Music </Link>
                <br />
                <Link className={css.profile_link} to="/settings"> Settings </Link>
                          


            </div>
        </nav>
    );
}

export default Nav;