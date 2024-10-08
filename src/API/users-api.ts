import {GetItemsType, instance, APIResponseType} from "./api";


export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 10) {
        let response = await instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`,);
        return response.data
    },
}
export const followAPI = {
    async followUser(userId: number) {
        let response = await instance.post<APIResponseType>(`follow/${userId}`, {}, {});
        return response.data
    },
    async unFollowUser(userId: number) {
        let response = await instance.delete<APIResponseType>(`follow/${userId}`, {});
        return response.data
    }
}
