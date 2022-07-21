import React from "react";
import './Nav.css';


const Nav = () => {
    
    return (
        <nav className='nav'>
            <div>
                <div><a href="#s">Profile</a></div>
                <div><a href="#s">Messages</a></div>
                <div><a href="#s">News</a></div>
                <div><a href="#s">Music</a></div>
                <br />
                <div><a href="#s">Settings</a></div>

            </div>
        </nav>
    );
}

export default Nav;