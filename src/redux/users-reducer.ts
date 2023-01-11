import { updateObjectInArray } from '../utils/objects-helpers';
import { usersAPI } from '../api/api';
import { UsersType } from '../types/types';

const FOLLOW = 'gp-network/users/FOLLOW'
const UNFOLLOW = 'gp-network/users/UNFOLLOW'
const SET_USERS = 'gp-network/users/SET_USERS'
const SET_CURRENT_PAGE = 'gp-network/users/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'gp-network/users/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'gp-network/users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOING_PROGRESS = 'TOGGLE_IS_FOLLOING_PROGRESS'

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> // array of users IDs
};

type InitialStateType = typeof initialState

export const testUsersState = (initialState: InitialStateType) => ({ initialState })

const usersReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            };


        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
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

type FollowSuccessActionType = { type: typeof FOLLOW, userId:number }
export const followSuccess = (userId: number): FollowSuccessActionType => ({ type: FOLLOW, userId })

type UnfollowSuccessActionType = { type: typeof UNFOLLOW, userId: number }
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({ type: UNFOLLOW, userId })

type SetUsersActionType = { type: typeof SET_USERS, users: Array<UsersType> }
export const setUsers = (users: Array<UsersType>): SetUsersActionType => ({ type: SET_USERS, users })

type SetCurrentPageActionType = { type: typeof SET_CURRENT_PAGE, currentPage: number }
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage: currentPage })

type SetTotalUsersCountActionType = { type: typeof SET_TOTAL_USERS_COUNT, totalCount: number }
export const setTotalUsersCount = (totalCount: number): SetTotalUsersCountActionType => ({ type: SET_TOTAL_USERS_COUNT, totalCount })

type ToggleIsFetchingActionType = { type: typeof TOGGLE_IS_FETCHING, isFetching: boolean }
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching })

type ToggleFollowingProgessActionType = { type: typeof TOGGLE_IS_FOLLOING_PROGRESS, isFetching: boolean, userId: number }
export const toggleFollowingProgess = (isFetching: boolean, userId: number): ToggleFollowingProgessActionType => ({ type: TOGGLE_IS_FOLLOING_PROGRESS, isFetching, userId })

export default usersReducer;


export const requestUsers = (currentPage: number, pageSize: number) => async (dispatch:any) => {
        dispatch(toggleIsFetching(true));

        const data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));

    }


const followUnfollowFlow = async (dispatch:any, id: number, apiMethod:any, actionCreator:any) => {
    dispatch(toggleFollowingProgess(true, id));
    const data = await apiMethod(id)
    if (data.resultCode === 0) {
        dispatch(actionCreator(id));
    }
    dispatch(toggleFollowingProgess(false, id));
}



export const follow = (id:number) => async (dispatch:any) => {
        followUnfollowFlow(dispatch, id, usersAPI.followUsers.bind(usersAPI), followSuccess)
    }


export const unfollow = (id:number) => {
    return async (dispatch:any) => {
        followUnfollowFlow(dispatch, id, usersAPI.unfollowUsers.bind(usersAPI), unfollowSuccess)
    }
}
