import { UserType } from "../types/types"
import { APIResponseType, instance } from './api';

type GetItemsResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 3) {
        return instance.get<GetItemsResponseType>(`users?page=${currentPage}&count=${pageSize}&term=l`)
            .then(response => response.data)
    },

    followUsers(id: number) {
        return instance.post<APIResponseType>(`follow/${id}`)
            .then(response => {
                return response.data
            })
    },

    unfollowUsers(id: number) {
        return instance.delete<APIResponseType>(`follow/${id}`)
            .then(response => response.data)
    },
}
