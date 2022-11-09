import * as axios from 'axios';


const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,

    headers: { "API-KEY": "89e75385-5661-4b9f-a401-c56e8784e40b" }

})


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 3) {

        return instance.get(`users?page=${currentPage}&count=${pageSize}&term=l`)

            .then(response => {

                return response.data
            });


    },

    unfollowUsers(id) {
        return instance.delete(`follow/${id}`)
            .then(response => {

                return response.data
            });

    },

    followUsers(id) {
        return instance.post(`follow/${id}`)
            .then(response => {

                return response.data
            });

    },

    getProfile(userId) {
        console.warn('Obsolete method. Please use profileAPI object.')
        return profileAPI.getProfile(userId);

    },
}

export const profileAPI = {

    getProfile(userId) {
        return instance.get(`profile/` + userId)
            .then(response => {

                return response.data
            });
    },

    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
    },

    updateStatus(status) {
        return instance.put(`profile/status/`, { status: status })
    },


}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
            .then(response => {

                return response.data
            });
    },

    login(email, password, rememberMe= false, captcha=null) {
        return instance.post(`auth/login`, { email, password, rememberMe, captcha })
            .then(response => {

                return response.data
            });
    },

    logout() {
        return instance.delete(`auth/login`);
    }


}

