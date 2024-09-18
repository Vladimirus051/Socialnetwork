import {getAuthUserData} from "./authReducer.ts";

const SET_INITIALIZED_SUCCESS = 'SET-INITIALIZED-SUCCESS';

export type initialStateType = {
    initialized: boolean

}
let initialState: initialStateType = {
    initialized: false
}

const appReducer = (state = initialState, action: any): initialStateType => {
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
export const initializedSuccess = (): SET_INITIALIZED_SUCCESS_TYPE => ({type: SET_INITIALIZED_SUCCESS})

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess())
    })
}
export default appReducer