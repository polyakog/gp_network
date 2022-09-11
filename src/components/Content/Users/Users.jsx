import * as axios from "axios";
import React from "react";
import css from './Users.module.css'
import userPhoto from '../../../assets/images/user.jpg'


class Users extends React.Component {

constructor (props) {
    super (props);
    axios.get(`https://social-network.samuraijs.com/api/1.0/users`)
    .then(response => {
        this.props.setUsers(response.data.items)
    });
}

render () {
    return (
        <div className={css.main}>
           <h2>Users</h2>
            <div>
                {
                    this.props.users.map(u => <div key={u.id} className={css.usersElement}>

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
                                ? <button className={css.activeButton} onClick={() => { this.props.unfollow(u.id) }}>Unfollow</button>
                                : <button onClick={() => { this.props.follow(u.id) }}>Follow</button>
                            }

                        </div>

                        
                    </div>

                    )
                }



            </div>
        </div>

    )

}    

}



export default Users;