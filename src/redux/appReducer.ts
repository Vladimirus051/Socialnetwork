import {getAuthUserData} from "./authReducer.ts";
import {InferActionTypes} from "./ReduxStore";

const SET_INITIALIZED_SUCCESS = 'my-new-app/appReducer/SET-INITIALIZED-SUCCESS';


let initialState = {
    initialized: false
}
export type initialStateType = typeof initialState
const appReducer = (state = initialState, action: actionType): initialStateType => {
    switch (action.type) {
        case SET_INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        default:
            return state
    }
}
type SET_INITIALIZED_SUCCESS_TYPE = {
    type: typeof SET_INITIALIZED_SUCCESS
}

export const actions = {
    initializedSuccess: (): SET_INITIALIZED_SUCCESS_TYPE => ({type: SET_INITIALIZED_SUCCESS}),
}
type actionType = InferActionTypes<typeof actions>
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(() => {
        dispatch(actions.initializedSuccess())
    })
}
export default appReducer