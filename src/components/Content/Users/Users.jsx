import * as axios from "axios";
import React from "react";
import css from './Users.module.css'
import userPhoto from '../../../assets/images/user.jpg'


const Users = (props) => {
    /* Server API docs: https://social-network.samuraijs.com/docs# */

    if (props.users.length === 0) {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users`).then(response => {
            
            props.setUsers(response.data.items)
        });


    }

    // { id: 1, followed: false, imgURL: "https://android-obzor.com/wp-content/uploads/2022/02/20-6.jpg", name: 'Gennadij', status: 'text', locaction: { city: 'Samara', country: 'Russia' } },
    // { id: 2, followed: true, imgURL: 'https://android-obzor.com/wp-content/uploads/2022/02/24-7.jpg', name: 'Anton', status: 'text', locaction: { city: 'Moscow', country: 'Russia' } },
    // { id: 3, followed: false, imgURL: 'https://android-obzor.com/wp-content/uploads/2022/02/29-7.jpg', name: 'Aleksey', status: 'text', locaction: { city: 'Rostov-on-don', country: 'Russia' } }



    let usersElement = props.users.map(u => <div key={u.id} className={css.usersElement}>

        <div >
            <img alt='avatar' className={css.imageUsers} src={
                u.photos.small != null 
                ? u.photos.small
                : userPhoto} />
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

        {console.log(u.photos.small)}

    </div>
                
    );


    return (
        <div className={css.main}>
            <h2>Users</h2>
            <div>
                {usersElement}
                
                


            </div>
        </div>

    )

}

export default Users;