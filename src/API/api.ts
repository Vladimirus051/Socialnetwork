import axios, {AxiosResponse} from "axios";
import {profileType} from "../types/types_for_app";

const apiKey = process.env.REACT_APP_API_KEY;
const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": apiKey
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`,).then(response => {
            return response.data
        })
    },
}
export const followAPI = {
    followUser(userId: number) {
        return instance.post(`follow/${userId}`, {}, {}).then(response => {
            return response.data
        })
    },
    unFollowUser(userId: number) {
        return instance.delete(`follow/${userId}`, {}).then(response => {
            return response.data
        })
    }
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeWithCaptchaEnum {
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: {
        id: string
        email: string
        login: string
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}
type loginResponseType = {
    data: {
        userId: string
    }
    resultCode: ResultCodeEnum | ResultCodeWithCaptchaEnum
    messages: Array<string>
}
export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data)
    },
    loginUser(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<loginResponseType>(`auth/login`, {email, password, rememberMe, captcha}).then(res => res.data)
    },
    logoutUser() {
        return instance.delete(`auth/login`)
    },
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get('profile/' + userId)
    },
    getStatus(userId: number) {
        return instance.get('profile/status/' + userId)
    },
    updateStatus(status: string) {
        return instance.put('profile/status', {status: status})
    },
    savePhoto(file: any) {
        const form = new FormData()
        form.append('image', file)
        return instance.put(`profile/photo/`, form, {headers: {'Content-Type': 'multipart/form-data'}})
    },
    saveProfile(profile: profileType) {
        return instance.put(`profile`, profile)
    }
}