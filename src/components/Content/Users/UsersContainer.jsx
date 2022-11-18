import React from 'react';
import { connect } from 'react-redux/es/exports';
import { follow, setCurrentPage, unfollow, requestUsers } from '../../../redux/users-reducer';
import Preloader from './../../common/Preloader/Preloader';
import Users from './Users';
import css from './Users.module.css';
import { compose } from 'redux';
import { getPageSize, getUsers, getTotalUsersCount, getCurrentPage, getSlicePage, getIsFetching, getFollowingInProgress } from '../../../redux/users-selectors';



class UsersContainer extends React.Component {

    componentDidMount() {

        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.requestUsers(pageNumber, this.props.pageSize) /* - thunk  */

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

// let mapStateToProps = (state) => {
//     return {
//         users: getUsers(state),
//         pageSize: getPageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         slicePage: state.usersPage.slicePage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress,

//     }
// }

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        slicePage: getSlicePage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),

    }
}

export default compose(
    connect(mapStateToProps, { setCurrentPage, follow, unfollow, requestUsers }),
    // withAuthRedirect
)(UsersContainer);
