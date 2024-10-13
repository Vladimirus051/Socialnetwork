import {instance, APIResponseType, ResultCodeEnum, ResultCodeWithCaptchaEnum} from "./api";

type MeResponseDataType = {
    id: string
    email: string
    login: string
}
type loginResponseDataType = {
    userId: string
}
type getCaptchaUrlDataType = {
    url: string
}
export const authAPI = {
    async me() {
        let res = await instance.get<APIResponseType<MeResponseDataType>>(`auth/me`);
        return res.data;
    },
    async loginUser(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        let res = await instance.post<APIResponseType<loginResponseDataType, ResultCodeEnum | ResultCodeWithCaptchaEnum>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        });
        return res.data;
    },
    logoutUser() {
        return instance.delete(`auth/login`)
    },
    getCaptchaUrl() {
        return instance.get<getCaptchaUrlDataType>(`security/get-captcha-url`)
    }
}