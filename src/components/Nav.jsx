import React from "react";
import './components/Nav';


const Nav = () => {
    
    return (
        <nav className='nav'>
            <div>
                <div><a href="">Profile</a></div>
                <div><a href="">Messages</a></div>
                <div><a href="">News</a></div>
                <div><a href="">Music</a></div>
                <br />
                <div><a href="">Settings</a></div>

            </div>
        </nav>
    );
}

export default Nav;