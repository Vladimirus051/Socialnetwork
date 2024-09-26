import {authAPI} from "../API/api.js";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'my-new-app/authReducer/SET_USER_DATA';
const SET_CAPTCHA_URL = 'my-new-app/authReducer/SET-CAPTCHA-URL';

let initialState = {
    userId: null as string | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean | null,
    captchaUrl: null as string | null
}
export type initialStateType = typeof initialState
const authReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case SET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: {
        userId: string | null
        email: string | null
        login: string | null
        isAuth: boolean | null
    }
}
export const setAuthUserData = (userId: string | null, email: string | null, login: string | null, isAuth: boolean | null): setAuthUserDataActionType => (
    {
        type: SET_USER_DATA,
        payload: {userId, email, login, isAuth}
    }
)
type setCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA_URL
    payload: {
        captchaUrl: string
    }
}
export const setCaptchaUrl = (captchaUrl: string): setCaptchaUrlActionType => (
    {
        type: 'my-new-app/authReducer/SET-CAPTCHA-URL',
        payload: {captchaUrl}
    }
)
export const getAuthUserData = () => async (dispatch: any) => {
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}
export const loginU = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let response = await authAPI.loginUser(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        // success, get auth data
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}
export const logoutU = () => async (dispatch: any) => {
    let response = await authAPI.logoutUser()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}
export const getCaptchaUrl = () => async (dispatch: any) => {
    let response = await authAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(setCaptchaUrl(captchaUrl))
}
export default authReducer