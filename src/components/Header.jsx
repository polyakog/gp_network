import React from "react";
import './Header.css';


const Header = () => {
    
    return (<header className="header">
        <img className='header-logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Henkel-Logo.svg/640px-Henkel-Logo.svg.png" alt="" />
        <h1 className='header-name'>Henkel Technical Network</h1>
    </header >);
}

export default Header;