import React from 'react';
import { connect } from 'react-redux';
import { follow, actions, unfollow, requestUsers } from '../../../redux/users-reducer';
import Preloader from './../../common/Preloader/Preloader';
import Users from './Users';
import css from './Users.module.css';
import { compose } from 'redux';
import { getPageSize, getUsers, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../../redux/users-selectors';
import { UserType } from '../../../types/types';
import { AppStateType } from '../../../redux/redux-store';


const setCurrentPage = actions.setCurrentPage

type MapStateToPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
    users: Array<UserType>
}

type MapDispatchToPropsType = {
    requestUsers: (currentPage: number, pageSize: number) => void
    setCurrentPage: (pageNumber: number) => void
    follow: (id:number) => void
    unfollow: (id: number) => void
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        const { currentPage, pageSize } = this.props
        this.props.requestUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const { pageSize } = this.props
        this.props.setCurrentPage(pageNumber);
        this.props.requestUsers(pageNumber, pageSize) /* - thunk  */

    }

    render() {
        return <div className={css.main}>
            <h2>{this.props.pageTitle}</h2>
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

let mapStateToProps = (state: AppStateType):MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),

    }
}

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {setCurrentPage, follow, unfollow, requestUsers }),
)(UsersContainer);
