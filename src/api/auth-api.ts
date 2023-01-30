import { APIResponseType, instance, ResultCodeForCaptchaEnum, ResultCodesEnum } from "./api";

type MeResponseDataType = { id: number, email: string, login: string }
type LoginResponseDataType = { userId: number }

export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`)
            .then(response => {
                return response.data
            });
    },

    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCaptchaEnum>>(`auth/login`, { email, password, rememberMe, captcha })
            .then(response => {
                return response.data
            });
    },

    logout() {
        return instance.delete(`auth/login`)
            .then(response => response.data);
    },

}
