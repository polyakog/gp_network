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
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${id}`) 
            .then(response => {

                return response.data
            }); 

        },

    followUsers(id) {
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${id}`)
            .then(response => {

                return response.data
            });

    }






}

