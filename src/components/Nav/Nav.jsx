import React from "react";
import css from './Nav.module.css';


const Nav = () => {
    
    return (
        <nav className={css.nav}>
            <div>
                <div ><a className={`${css.profile_link} ${css.active}`} href="#s">Profile</a></div>
                <div ><a className={css.profile_link} href="#s">Messages</a></div>
                <div ><a className={css.profile_link} href="#s">News</a></div>
                <div ><a className={css.profile_link} href="#s">Music</a></div>
                <br />
                <div ><a className={css.profile_link} href="#s">Settings</a></div>

            </div>
        </nav>
    );
}

export default Nav;