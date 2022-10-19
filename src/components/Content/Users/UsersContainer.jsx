import React from 'react';
import { connect } from 'react-redux/es/exports';
import { follow, setCurrentPage, unfollow, getUsers } from '../../../redux/users-reducer';
import Preloader from './../../common/Preloader/Preloader';
import Users from './Users';
import css from './Users.module.css';
import { withAuthRedirect } from './../../../hoc/withAuthRedirect';
import { compose } from 'redux';



class UsersContainer extends React.Component {

    componentDidMount() {

        this.props.getUsers(this.props.currentPage, this.props.pageSize)
          }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsers(pageNumber, this.props.pageSize) /* - thunk  */
      
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

export default compose (
    connect(mapStateToProps, { setCurrentPage, follow, unfollow, getUsers }),
    withAuthRedirect
)(UsersContainer);
