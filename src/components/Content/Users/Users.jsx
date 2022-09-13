import * as axios from "axios";
import React from "react";
import css from './Users.module.css'
import userPhoto from '../../../assets/images/user.jpg'


class Users extends React.Component {

componentDidMount (){
    
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}&term=len`)
        .then(response => {
            this.props.setUsers(response.data.items)
            
            this.props.setTotalUsersCount(101)
            
        });
}

    
onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);

    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}&term=len`)
        .then(response => {
            this.props.setUsers(response.data.items);

        });
}

render () {

    let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
    
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);

    }

    return (
        <div className={css.main}>
           <h2>Users</h2>
           
          <div>
            {pages.map(p => {
            return <span key={p} className={this.props.currentPage === p ? css.sectedPage : ""}
                onClick={() => { this.onPageChanged(p); }}>{p}  </span>
                       
            })
            }
            
            </div> 
                       
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