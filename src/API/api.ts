import axios from "axios";
import {UserType} from "../types/types_for_app";

const apiKey = process.env.REACT_APP_API_KEY;
export const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": apiKey
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})
export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeWithCaptchaEnum {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string
}
export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}