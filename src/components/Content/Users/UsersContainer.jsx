// import React from 'react';
import { followAC, unfollowAC, setUsersAC } from '../../../redux/users-reducer';
import { connect } from 'react-redux/es/exports';
import Users from './Users';




let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId))
        },

        unfollow: (userId) => {
            dispatch(unfollowAC(userId))
        },

        setUsers: (users) => {
            dispatch (setUsersAC(users))
        }



    }

}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer;