import React from "react";
import css from './Users.module.css'
import userPhoto from '../../../assets/images/noPic.jpg'
import { NavLink } from "react-router-dom";
import axios from "axios";
import { usersAPI } from './../../../api/api';


const Users =(props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);

    }

    return (
        <div >
                      
          <div>
            {pages.map(p => {
            return <span key={p} className={props.currentPage === p ? css.sectedPage : ""}
                onClick={() => { props.onPageChanged(p); }}>{p}  </span>                     
            })
            }
            
            </div> 
                       
            <div>
                {
                    props.users.map(u => <div key={u.id} className={css.usersElement}>

                        
                        <div >
                            <NavLink to={"/profile/" + u.id} >
                            <img alt='avatar' src={
                                u.photos.small != null
                                    ? u.photos.small
                                        : userPhoto} className={css.imageUsers}/>
                            </NavLink>
                        </div>
                        

                        <div className={css.usersData}>
                            <div>Name: {u.name}</div>
                            <div>ID:{u.id}</div>
                            <div>{"u.locaction.country"}</div>
                            <div>Status:{u.status}</div>
                            <div>{"u.locaction.city"}</div>
                        </div >
                        <div className={css.button}>
                            {u.followed
                                ? <button className={css.unfollow} onClick={() => { 
                                   
                                    
                                    usersAPI.unfollowUsers(u.id).then (data =>{
                                        if (data.resultCode === 0) {
                                            props.unfollow(u.id)
                                        }
                                    });

                                    }}>Unfollow {u.id}</button>

                                : <button className={css.follow} onClick={() => { 
                                    
                                    usersAPI.followUsers(u.id).then(data => {
                                        if (data.resultCode === 0) {
                                            props.follow(u.id)
                                        }
                                    });

                                
                                }}>Follow me! {u.id}</button>
                            }

                        </div>

                        
                    </div>

                    )
                }



            </div>
        </div>

    )

}    



export default Users;