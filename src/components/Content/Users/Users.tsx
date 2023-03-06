import React, { useEffect } from "react";
import css from './Users.module.css'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatchType } from "../../../redux/redux-store";
import { actions, FilterType, follow, requestUsers, unfollow } from "../../../redux/users-reducer";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from "../../../redux/users-selectors";
import Paginator from "../../common/Paginator/Paginator";
import User from "./User";
import { UsersSearchForm } from './UsersSearchForm';


type PropsType = {}

export const Users: React.FC<PropsType> = (props) => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const users = useSelector(getUsers)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)
    const dispatch: AppDispatchType = useDispatch()


    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(actions.setCurrentPage(pageNumber))
        dispatch(requestUsers(pageNumber, pageSize, filter)) /* - thunk  */
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const followUser = (id: number) => {
        dispatch(follow(id))
    }

    const unfollowUser = (id: number) => {
        dispatch(unfollow(id))
    }

    return (
        <div >
            <div className={css.UsersSearchForm}> <UsersSearchForm onFilterChanged={onFilterChanged} filter={filter} /></div>
            <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} />

            {users.map(u => <User user={u}
                followingInProgress={followingInProgress}
                unfollow={unfollowUser}
                follow={followUser}
                key={u.id}

            />
            )}
        </div>
    )
}
