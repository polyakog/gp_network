import { getAuthUserData } from './auth-reducer';
import { BaseThunkType, InferActionsTypes } from './redux-store';

const types = {
    INITIALAZED_SUCCESS: 'gp-network/app/INITIALAZED_SUCCESS' as 'gp-network/app/INITIALAZED_SUCCESS'
}

let initialState = {
    initialized: false,
    globalError: null as null | string// dispatch errror in app(99 ITK)
};

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case types.INITIALAZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            };

        default:
            return state;
    }
}

export const actions = {
    initializedSuccess: () => ({ type: types.INITIALAZED_SUCCESS }) as const
}

export default appReducer;

/* Thunk */
export const initializeApp = (): ThunkType =>  (dispatch) => {
    let promise = dispatch(getAuthUserData());
    // debugger
    Promise.all([promise]).then(() => {
        dispatch(actions.initializedSuccess());
    }
    )
}

export type InitialStateType = typeof initialState
type ActionsTypes = ReturnType<InferActionsTypes<typeof actions>>
type ThunkType = BaseThunkType<ActionsTypes, void> // from general imported thunk 