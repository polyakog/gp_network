import axios from 'axios';
import { UserType } from '../types/types';
import { ProfileType } from '../types/types';


const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: { "API-KEY": "89e75385-5661-4b9f-a401-c56e8784e40b" }

})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

type UsersGetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

type UsersFollowingUsersResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 3) {
        return instance.get<UsersGetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}&term=l`)
            .then(response => response.data);
    },

    unfollowUsers(id: number) {
        return instance.delete<UsersFollowingUsersResponseType>(`follow/${id}`)
            .then(response => {
                return response.data
            });

    },

    followUsers(id: number) {
        return instance.post<UsersFollowingUsersResponseType>(`follow/${id}`)
            .then(response => {
                return response.data
            });
    },

    getProfile(userId: number) {
        console.warn('Obsolete method. Please use profileAPI object.')
        return profileAPI.getProfile(userId);
    },
}

type ProfileUpdateStatusResponseType = {
    status: string
    resultCode: ResultCodesEnum
}

type ProfileSavePhotoResponseType = {
    data: { photos: { small: string, large: string } }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type ProfileSaveProfileResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

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
        return instance.put<ProfileUpdateStatusResponseType>(`profile/status/`, { status: status })
            .then(response => response.data)
    },

    savePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append("image", photoFile)
        return instance.put<ProfileSavePhotoResponseType>(`profile/photo/`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(resp => resp.data)
    },

    saveProfile(profile: ProfileType) {
        return instance.put<ProfileSaveProfileResponseType>(`profile`, profile)
            .then(resp => resp.data)
    },
}


type AuthMeResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type AuthLoginResponseType = {
    data: { userId: number }
    resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}


export const authAPI = {
    me() {
        return instance.get<AuthMeResponseType>(`auth/me`)
            .then(response => {
                return response.data
            });
    },

    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<AuthLoginResponseType>(`auth/login`, { email, password, rememberMe, captcha })
            .then(response => {
                return response.data
            });
    },

    logout() {
        return instance.delete<AuthMeResponseType>(`auth/login`)
            .then(response => {
                return response.data
            });
    },

}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<{ url: string }>(`security/get-captcha-url`)
            .then(resp => resp.data)

    },

}

