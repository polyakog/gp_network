import { updateObjectInArray } from '../utils/objects-helpers';
import { usersAPI } from '../api/api';
import { UserType } from '../types/types';
import { AppStateType, InferActionsTypes } from './redux-store';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

const types = {
    FOLLOW: 'gp-network/users/FOLLOW' as 'gp-network/users/FOLLOW',
    UNFOLLOW: 'gp-network/users/UNFOLLOW' as 'gp-network/users/UNFOLLOW',
    SET_USERS: 'gp-network/users/SET_USERS' as 'gp-network/users/SET_USERS',
    SET_CURRENT_PAGE: 'gp-network/users/SET_CURRENT_PAGE' as 'gp-network/users/SET_CURRENT_PAGE',
    SET_TOTAL_USERS_COUNT: 'gp-network/users/SET_TOTAL_USERS_COUNT' as 'gp-network/users/SET_TOTAL_USERS_COUNT',
    TOGGLE_IS_FETCHING: 'gp-network/users/TOGGLE_IS_FETCHING' as 'gp-network/users/TOGGLE_IS_FETCHING',
    TOGGLE_IS_FOLLOING_PROGRESS: 'gp-network/users/TOGGLE_IS_FOLLOING_PROGRESS' as 'gp-network/users/TOGGLE_IS_FOLLOING_PROGRESS'
}

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> // array of users IDs
};

type InitialStateType = typeof initialState

export const testUsersState = (initialState: InitialStateType) => ({ initialState })

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case types.FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
            };

        case types.UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            };

        case types.SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }

        case types.SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }

        case types.SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.totalCount
            }
        }

        case types.TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }

        case types.TOGGLE_IS_FOLLOING_PROGRESS: {
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

// type ActionsTypes = InferActionsTypes<typeof actions>
type ActionsTypes = ReturnType<InferActionsTypes<typeof actions>>

export const actions = {
    followSuccess: (userId: number) => ({ type: types.FOLLOW, userId }) as const,
    unfollowSuccess: (userId: number) => ({ type: types.UNFOLLOW, userId }) as const,
    setUsers: (users: Array<UserType>) => ({ type: types.SET_USERS, users }) as const,
    setCurrentPage: (currentPage: number) => ({ type: types.SET_CURRENT_PAGE, currentPage: currentPage }) as const,
    setTotalUsersCount: (totalCount: number) => ({ type: types.SET_TOTAL_USERS_COUNT, totalCount }) as const,
    toggleIsFetching: (isFetching: boolean) => ({ type: types.TOGGLE_IS_FETCHING, isFetching }) as const,
    toggleFollowingProgess: (isFetching: boolean, userId: number) => ({ type: types.TOGGLE_IS_FOLLOING_PROGRESS, isFetching, userId }) as const
}

export default usersReducer;

type DispatchType = Dispatch<ActionsTypes>
// type GetStateType = () => AppStateType
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true));
    const data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
}

export const follow = (id: number): ThunkType => async (dispatch, getState) => {
    _followUnfollowFlow(dispatch, id, usersAPI.followUsers.bind(usersAPI), actions.followSuccess)
}

export const unfollow = (id: number): ThunkType => {
    return async (dispatch, getState) => {
        _followUnfollowFlow(dispatch, id, usersAPI.unfollowUsers.bind(usersAPI), actions.unfollowSuccess)
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType, id: number, apiMethod: any, actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingProgess(true, id));
    const data = await apiMethod(id)
    if (data.resultCode === 0) {
        dispatch(actionCreator(id));
    }
    dispatch(actions.toggleFollowingProgess(false, id));
}
