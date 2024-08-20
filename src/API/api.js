import axios from "axios";
import {setAuthUserData} from "../redux/authReducer";

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "47921e3b-152d-4e34-8c1d-4d30f9c1886f"
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
        return instance.post(`follow/${userId}`, {}, {}).then(response => {return response.data})
    },
    unFollowUser(userId) {
        return instance.delete(`follow/${userId}`, {}).then(response => {return response.data})
    }
}
export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    }
}
export const profileAPI = {
    getProfile(userId) {
        return instance.get('profile/' + userId)
    }
}