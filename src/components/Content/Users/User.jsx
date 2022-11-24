import React from "react";
import css from './Users.module.css'
import userPhoto from '../../../assets/images/noPic.jpg'
import { NavLink } from "react-router-dom";




const User = ({ user, followingInProgress, unfollow, follow}) => {

    return (
        <div >
                       
                <div  className={css.usersElement}>

                        <div >
                            <NavLink to={"/profile/" + user.id} >
                                <img alt='avatar' src={
                                    user.photos.small != null
                                        ? user.photos.small
                                        : userPhoto} className={css.imageUsers} />
                            </NavLink>
                        </div>
                        <div className={css.usersData}>
                            <div>Name: {user.name}</div>
                            <div>ID:{user.id}</div>
                            <div>{"user.locaction.country"}</div>
                            <div>Status:{user.status}</div>
                            <div>{"user.locaction.city"}</div>
                        </div >
                        <div className={css.button}>
                            {user.followed
                            
                                ? <button disabled={followingInProgress
                                    .some(id => id === user.id)} className={css.unfollow}
                                    onClick={() => {unfollow(user.id) }}>
                                    Unfollow {user.id}</button>

                                : <button disabled={followingInProgress
                                    .some(id => id === user.id)} className={css.follow}
                                    onClick={() => {follow(user.id) }}>
                                    Follow me! {user.id}</button>
                            }
                        </div>
                    </div>
                    
                
           
        </div>

    )

}



export default User;


{/* {users.map(u => <User user={u}
                followingInProgress={props.followingInProgress}
                unfollow={props.unfollow}
                follow={props.follow}
                key={u.id}

            />
            )} */}