import {photosType, profileType} from "../types/types_for_app";
import {instance, APIResponseType, ResultCodeEnum} from "./api";

type savePhotoType = {
    photos: photosType
}
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<profileType>('profile/' + userId)
    },
    getStatus(userId: number) {
        return instance.get<string>('profile/status/' + userId)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>('profile/status', {status: status})
    },
    savePhoto(file: any) {
        const form = new FormData()
        form.append('image', file)
        return instance.put<APIResponseType<savePhotoType>>(`profile/photo/`, form, {headers: {'Content-Type': 'multipart/form-data'}})
    },
    saveProfile(profile: profileType) {
        return instance.put<APIResponseType>(`profile`, profile)
    }
}