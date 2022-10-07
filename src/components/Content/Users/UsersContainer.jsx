import React from 'react';
import { connect } from 'react-redux/es/exports';
import { follow, setCurrentPage, setTotalUsersCount, setUsers, toggleIsFetching, unfollow, toggleFollowingProgess } from '../../../redux/users-reducer';
import { usersAPI } from './../../../api/api';
import Preloader from './../../common/Preloader/Preloader';
import Users from './Users';
import css from './Users.module.css';



class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(101)
            });

    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)
 
        });

    }

    render() {
        return <div className={css.main}>
            <h2>Users</h2>
                        {/* Выбираем показ Loading (пока не загрузились данные) или демонстрацию юзерс */}
            {this.props.isFetching 
            ? <Preloader /> 
            : <Users totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    toggleFollowingProgess={this.props.toggleFollowingProgess}
                    followingInProgress={this.props.followingInProgress}
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
        followingInProgress: state.usersPage.followingInProgress,

    }
}

const UsersContainer2 = connect(mapStateToProps, { follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching, toggleFollowingProgess  })(UsersContainer)

export default UsersContainer2;