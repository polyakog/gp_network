import React from "react";
import css from './Users.module.css'
import userPhoto from '../../../assets/images/noPic.jpg'
import { NavLink } from "react-router-dom";
import axios from "axios";


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
                                   
                                    

                                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                        withCredentials: true,
                                        headers: {
                                            "API-KEY": "89e75385-5661-4b9f-a401-c56e8784e40b"
                                        }
                                    })
                                        .then(response => {
                                            if (response.data.resultCode == 0) {
                                                props.unfollow(u.id)

                                            }
                                        });
                                  



                                }}>Unfollow {u.id}</button>

                                : <button className={css.follow} onClick={() => { 
                                    
                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                        withCredentials: true,
                                        headers: {
                                            "API-KEY": "89e75385-5661-4b9f-a401-c56e8784e40b"
                                        }
                                    })
                                        .then(response => {
                                            if (response.data.resultCode ==0) {
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