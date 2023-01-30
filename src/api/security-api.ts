import { instance } from "./api"

type GetCaptchaUrlResponseType = { url: string }

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`)
            .then(resp => resp.data)
    },
}