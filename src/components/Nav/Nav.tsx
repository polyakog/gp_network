import React from "react";
import css from './Nav.module.css';
import { NavLink } from 'react-router-dom';
import Friends from './Friends/Friends';
import { FriendsType } from "../../redux/sidebar-reducer";

type PropsType = {
    friendsData: { friendsId1: Array<FriendsType> }
}

const Nav: React.FC<PropsType> = (props) => {

    let friendElements = props.friendsData.friendsId1.map(d => (<Friends key={d.Id} Id={d.Id} name={d.name} />))

    return (
        <nav className={css.nav}>

            <div className={css.links}>

                <NavLink className={({ isActive }) => (isActive ? css.activeLink : css.link)} to="/profile"> Profile </NavLink>
                <NavLink className={({ isActive }) => (isActive ? css.activeLink : css.link)} to="/dialogs"> Messages </NavLink>
                <NavLink className={({ isActive }) => (isActive ? css.activeLink : css.link)} to="/news"> News </NavLink>
                <NavLink className={({ isActive }) => (isActive ? css.activeLink : css.link)} to="/music"> Music </NavLink>
                <NavLink className={({ isActive }) => (isActive ? css.activeLink : css.link)} to="/users"> Users </NavLink>
                <br />___________________
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