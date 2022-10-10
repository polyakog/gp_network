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
    users: [ ],
    pageSize: 3,
    totalUsersCount: 0,
    currentPage: 1,
    slicePage: [1,5],
    isFetching: true,
    followingInProgress: []


};


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
            return { ...state, isFetching: action.isFetching}
        }

        case TOGGLE_IS_FOLLOING_PROGRESS: {
            return {...state, 
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


export const getUsers = (currentPage, pageSize) => {
return (dispatch) => {
dispatch(toggleIsFetching(true));
    usersAPI.getUsers(currentPage, pageSize).then(data => {
    dispatch (toggleIsFetching(false));
    dispatch (setUsers(data.items));
    dispatch (setTotalUsersCount(101));
        });
    }
}


export const follow = (id) => {
return (dispatch) => {
    dispatch (toggleFollowingProgess(true, id));
    usersAPI.followUsers(id).then(data => {
        if (data.resultCode === 0) {
            dispatch(followSuccess(id));
        }
        dispatch(toggleFollowingProgess(false, id));

    });
    }
}

export const unfollow = (id) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgess(true, id));
        usersAPI.unfollowUsers(id).then(data => {
            if (data.resultCode === 0) {
                dispatch(unfollowSuccess(id));
            }
            dispatch(toggleFollowingProgess(false, id));

        });
    }
}
