import React from 'react';
import * as axios from "axios";
import { followAC, unfollowAC, setUsersAC, setCurrentPageAC, setTotalUsersCountAC, toggleIsFetchingAC } from '../../../redux/users-reducer';
import { connect } from 'react-redux/es/exports';
import Users from './Users';
import Preloader from './../../common/Preloader/Preloader'
import css from './Users.module.css'




class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}&term=len`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(101)
            });
    }


    onPageChanged = (pageNumber) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}&term=len`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items);

            });
    }

    render() {
        return <div className={css.main}>
            <h2>Users</h2>
                        {/* Выбираем показ загрузки (пока не загрузились данные) или демонстрацию юзерс */}
            {this.props.isFetching 
            ? <Preloader /> 
            : <Users totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                />}
            

            
                </div>
    }
}




let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        slicePage: state.usersPage.slicePage,
        isFetching: state.usersPage.isFetching,

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
            dispatch(setUsersAC(users))
        },

        setCurrentPage: (currentPage) => {
            dispatch(setCurrentPageAC(currentPage))
        },

        setTotalUsersCount: (totalCount) => {
            dispatch(setTotalUsersCountAC(totalCount))
        },

        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetchingAC(isFetching))
        }



    }

}

const UsersContainer2 = connect(mapStateToProps, mapDispatchToProps)(UsersContainer)

export default UsersContainer2;