import axios from "axios";
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
    followUser(userId) {
        return instance.post(`follow/${userId}`, {}, {}).then(response => {
            return response.data
        })
    },
    unFollowUser(userId) {
        return instance.delete(`follow/${userId}`, {}).then(response => {
            return response.data
        })
    }
}
export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    loginUser(email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logoutUser() {
        return instance.delete(`auth/login`)
    },
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}
export const profileAPI = {
    getProfile(userId) {
        return instance.get('profile/' + userId)
    },
    getStatus(userId) {
        return instance.get('profile/status/' + userId)
    },
    updateStatus(status) {
        return instance.put('profile/status', {status: status})
    },
    savePhoto(file) {
        const form = new FormData()
        form.append('image', file)
        return instance.put(`profile/photo/`,form, {headers: {'Content-Type': 'multipart/form-data'}})
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile)
    }
}