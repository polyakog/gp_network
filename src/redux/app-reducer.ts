
import { getAuthUserData } from './auth-reducer';


const INITIALAZED_SUCCESS = 'gp-network/app/INITIALAZED_SUCCESS'


export type InitialStateType = {
    initialized: boolean
    globalError: null | string

}

let initialState: InitialStateType = {
    initialized: false,
    globalError: null // dispatch errror in app(99 ITK)
};

const appReducer = (state = initialState, action:any): InitialStateType => {
    switch (action.type) {
        case INITIALAZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            };


        default:
            return state;


    }
}


export type InitializedSuccessActionType = {
    type: typeof INITIALAZED_SUCCESS //'INITIALAZED_SUCCESS'
}

export const initializedSuccess = (): InitializedSuccessActionType => ({ type: INITIALAZED_SUCCESS})




export default appReducer;



/* Thunk */
export const initializeApp = () => (dispatch:any) => {
    let promise = dispatch(getAuthUserData());
    // debugger
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess());
    }

    )


}

