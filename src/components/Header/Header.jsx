import React from "react";
import css from './Header.module.css';


const Header = () => {
    
    return (<header className={css.header}>
        <img className={css.header_logo} src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Henkel-Logo.svg/640px-Henkel-Logo.svg.png" alt="" />
        <h1 className={css.header_name}>Henkel Technical Network</h1>
    </header >);
}

export default Header;