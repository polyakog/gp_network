
import { getAuthUserData } from './auth-reducer';

const INITIALAZED_SUCCESS = 'INITIALAZED_SUCCESS'



let initialState = {
    initialized: false,
    globalError: null // dispatch errror in app
   

};


const appReducer = (state = initialState, action) => {
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

export const initializedSuccess = () => ({ type: INITIALAZED_SUCCESS})


export default appReducer;



    /* Thunk */
export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
// debugger
    Promise.all ([promise]).then(()=>{
       dispatch (initializedSuccess()); 
    }

    )
  

    }

