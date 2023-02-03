import { ProfileType } from "../types/types";
import { APIResponseType, instance } from "./api";

type SavePhotoResponseDataType = { photos: { small: string, large: string } }

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId)
            .then(response => {
                return response.data
            });
    },

    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId)
            .then(response => response.data)
    },

    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status/`, { status: status })
            .then(response => response.data)
    },

    savePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append("image", photoFile)
        return instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo/`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(resp => resp.data)
    },

    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>(`profile`, profile)
            .then(resp => resp.data)
    },
}
