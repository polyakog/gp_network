import React, { useEffect } from "react";
import css from './Users.module.css'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatchType } from "../../../redux/redux-store";
import { actions, FilterType, follow, requestUsers, unfollow } from "../../../redux/users-reducer";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from "../../../redux/users-selectors";
import Paginator from "../../common/Paginator/Paginator";
import User from "./User";
import { UsersSearchForm } from './UsersSearchForm';
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";


type PropsType = {}
type QueryParamsType = { page?: string, term?: string, friend?: string }

export const Users: React.FC<PropsType> = (props) => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const users = useSelector(getUsers)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)
    const dispatch: AppDispatchType = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const parsed: QueryParamsType = queryString.parse(location.search)

        let actualPage = currentPage
        let actualFilter = filter
        // debugger
        if (!!parsed.page) { actualPage = Number(parsed.page) }
        if (!!parsed.term) { actualFilter = { ...actualFilter, term: parsed.term as string } }
        // if (!!parsed.friend) { actualFilter = { ...actualFilter, friend: parsed.friend === 'null' ? null : parsed.friend === 'true'}? true: false }

        switch (parsed.friend) {
            case "null":
                actualFilter = { ...actualFilter, friend: null }
                break
            case "true":
                actualFilter = { ...actualFilter, friend: true }
                break
            case "false":
                actualFilter = { ...actualFilter, friend: false }
                break

        }

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
        dispatch(actions.setCurrentPage(actualPage))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}
        // debugger
        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)


        navigate({
            pathname: location.pathname,
            search: `${createSearchParams(query)}`,
        })

    }, [filter, currentPage, navigate, location.pathname])



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
            <div className={css.UsersSearchForm}> <UsersSearchForm onFilterChanged={onFilterChanged} /></div>
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
