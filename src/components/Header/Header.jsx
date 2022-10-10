import React from "react";
import css from './Header.module.css';
import noPic from '../../assets/images/noPic.jpg'
import { NavLink } from 'react-router-dom';




const Header = (props) => {

    return (<header className={css.subheader}>
        <img className={css.subheader_logo} src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Henkel-Logo.svg/640px-Henkel-Logo.svg.png" alt="" />
        <h1 className={css.subheader_name}>API Social Network</h1>

        {props.isAuth
            ? (<div className={css.userData}>
                    <img className={css.userPhoto} src={!props.userPhoto ? noPic : props.userPhoto} alt="" />
                    <div className={css.userName}>
                    {props.login} ID:{props.userId}
                    
                    </div>
                
                
            </div>)
            : <NavLink to={'/login/'} className={css.login}>LOGIN</NavLink>
        }


    </header >



    );
}

export default Header;