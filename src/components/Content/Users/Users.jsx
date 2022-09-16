import React from "react";
import css from './Users.module.css'
import userPhoto from '../../../assets/images/user.jpg'
import { NavLink } from "react-router-dom";


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
                            <div>{u.name}</div>
                            <div>{"u.locaction.country"}</div>
                            <div>{u.status}</div>
                            <div>{"u.locaction.city"}</div>
                        </div >
                        <div className={css.button}>
                            {u.followed
                                ? <button className={css.activeButton} onClick={() => { props.unfollow(u.id) }}>Unfollow</button>
                                : <button onClick={() => { props.follow(u.id) }}>Follow</button>
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