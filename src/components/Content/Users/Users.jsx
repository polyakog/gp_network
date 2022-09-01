import React from "react";
import css from './Users.module.css'

const Users = (props) => {

if (props.users.length === 0) {
    props.setUsers (
        [
        { id: 1, followed: false, imgURL: "https://android-obzor.com/wp-content/uploads/2022/02/20-6.jpg", name: 'Gennadij', status: 'text', locaction: { city: 'Samara', country: 'Russia' } },
        { id: 2, followed: true, imgURL: 'https://android-obzor.com/wp-content/uploads/2022/02/24-7.jpg', name: 'Anton', status: 'text', locaction: { city: 'Moscow', country: 'Russia' } },
        { id: 3, followed: false, imgURL: 'https://android-obzor.com/wp-content/uploads/2022/02/29-7.jpg', name: 'Aleksey', status: 'text', locaction: { city: 'Rostov-on-don', country: 'Russia' } }
    ]
        
        )
}
    


    

    let usersElement = props.users.map(u => (
        <div key={u.id} className={css.usersElement}>

            <div ><img alt='avatar' className={css.imageUsers} src={u.imgURL} /></div>
            <div className={css.usersData}>
                <div>{u.name}</div>
                <div>{u.locaction.country}</div>
                <div>{u.status}</div>
                <div>{u.locaction.city}</div>                  
            </div >
            <div className={css.button}>
                {u.followed 
                    ? <button className={css.activeButton} onClick={() => { props.unfollow(u.id) }}>Unfollow</button>
                    : <button onClick={() => { props.follow(u.id) }}>Follow</button>
                }
                
            </div>

        </div>

    ));

    // { id: 1, followed: false, imgURL: "https://android-obzor.com/wp-content/uploads/2022/02/20-6.jpg", name: 'Gennadij', status: 'text', locaction: { city: 'Samara', country: 'Russia' } },




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