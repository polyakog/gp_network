import React from "react";
import css from './Header.module.css';
import noPic from '../../assets/images/noPic.jpg'
import { NavLink, Navigate } from 'react-router-dom';




const Header = (props) => {

    // const redirectToLogin =() => {
    //     <Navigate to='/login' />
    // }
    return (<header className={css.subheader}>
        {/* <img className={css.subheader_logo} src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Henkel-Logo.svg/640px-Henkel-Logo.svg.png" alt="" /> */}
        <h1 className={css.subheader_name}>API Social Network</h1>

        {props.isAuth
            ? (<div className={css.userData}>
                <div>
                    <img className={css.userPhoto} src={!props.userPhoto ? noPic : props.userPhoto} alt="avatar" />
                    <button onClick={props.logout}>Log out</button>
                </div>

                <div className={css.userName}>
                    <span>userName: {props.login} /</span>
                    <span>  ID: {props.userId} </span>
                </div>
            </div>)
            : <NavLink to={'/login/'} className={css.login}>LOGIN</NavLink>
            // : <button onClick={redirectToLogin}>LOGIN</button>
        }


    </header >



    );
}

export default Header;