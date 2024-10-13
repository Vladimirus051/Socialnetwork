import {ResultCodeEnum, ResultCodeWithCaptchaEnum} from "../API/api";
import {stopSubmit} from "redux-form";
import {authAPI} from "../API/auth-api";
import {BaseThunkType} from "./ReduxStore";

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
const actions = {
    setAuthUserData: (userId: string | null, email: string | null, login: string | null, isAuth: boolean | null): ActionType => ({
        type: SET_USER_DATA,
        payload: {userId, email, login, isAuth}
    }),
    setCaptchaUrl: (captchaUrl: string): ActionType => ({type: SET_CAPTCHA_URL, payload: {captchaUrl}})
}
type ActionType = {
    type: typeof SET_USER_DATA | typeof SET_CAPTCHA_URL
    payload: {
        userId?: string | null
        email?: string | null
        login?: string | null
        isAuth?: boolean | null
        captchaUrl?: string | null
    }
}
type ThunkType = BaseThunkType<ActionType | ReturnType<typeof stopSubmit>>

const authReducer = (state = initialState, action: ActionType): initialStateType => {
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
export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me()

    if (meData.resultCode === ResultCodeEnum.Success) {
        let {id, login, email} = meData.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}
export const loginUser = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let loginData = await authAPI.loginUser(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodeEnum.Success) {
        // success, get auth data
        await dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === ResultCodeWithCaptchaEnum.CaptchaIsRequired) {
            await dispatch(getCaptchaUrl())
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}
export const logoutUser = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logoutUser()
    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let response = await authAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(actions.setCaptchaUrl(captchaUrl))
}


export default authReducer