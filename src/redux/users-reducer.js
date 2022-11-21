// import React from "react";
import { usersAPI } from './../api/api';

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOING_PROGRESS = 'TOGGLE_IS_FOLLOING_PROGRESS'



let initialState = {
    users: [],
    pageSize: 3,
    totalUsersCount: 0,
    currentPage: 1,
    slicePage: [1, 5],
    isFetching: true,
    followingInProgress: []
};

export const testUsersState = (initialState) => ({ initialState })

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })

            };


        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    } else {
                        return u;
                    }
                })

            };

        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }

        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }

        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.totalCount
            }
        }

        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }

        case TOGGLE_IS_FOLLOING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }

        }

        default:
            return state;


    }
}

export const followSuccess = (userId) => ({ type: FOLLOW, userId })
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage: currentPage })
export const setTotalUsersCount = (totalCount) => ({ type: SET_TOTAL_USERS_COUNT, totalCount })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgess = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOING_PROGRESS, isFetching, userId })

export default usersReducer;


export const requestUsers = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));

        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(150));
        });
    }
}

const followUnfollowFlow = async (dispatch, apiMethod, actionCrator, id) => {

    dispatch(toggleFollowingProgess(true, id));
    let data = await apiMethod(id)
    if (data.resultCode === 0) {
        dispatch(actionCrator(id));
    }
    dispatch(toggleFollowingProgess(false, id));


}

export const follow = (id) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, usersAPI.followUsers.bind(usersAPI), followSuccess, id)

        // dispatch(toggleFollowingProgess(true, id));
        // apiMethod(id).then(data => {
        //     if (data.resultCode === 0) {
        //         dispatch(actionCrator(id));
        //     }
        //     dispatch(toggleFollowingProgess(false, id));
        // });
    }
}

export const unfollow = (id) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, usersAPI.unfollowUsers.bind(usersAPI), unfollowSuccess, id)
    }
}
