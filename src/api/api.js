import * as axios from 'axios';


const instance = axios.create ({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    
    headers: {"API-KEY": "89e75385-5661-4b9f-a401-c56e8784e40b" }

})


export const usersAPI = {
    getUsers(currentPage =1 , pageSize=3){
        
        return instance.get(`users?page=${currentPage}&count=${pageSize}&term=len`)

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

    authUsers () {
        return instance.get(`auth/me`)
            .then(response => {

                    return response.data
                });

    },

    userData(userId) {
        return instance.get(`profile/` + userId)
            .then(response => {

                return response.data
            });

    },

    





}

