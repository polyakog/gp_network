import { DialogsResponseType, MessageItemsType} from "../types/types"
import { APIResponseType, instance } from './api';

type GetMessagesItemsResponseType = {
    items: Array<MessageItemsType>
    totalCount: number
    error: string | null
}

export const dialogsAPI = {

    getDialogs() {                                                      //get all dialogs
        return instance.get<DialogsResponseType[]>('dialogs')
            .then(response => response.data)
    },

getMessagesList(userId: number, currentPage = 1, pageSize = 3) {       //get list of messages with your friend
        return instance.get(`dialogs/${userId}/messages?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },


    startChat(userId: number) {                                         //start chatting, refresh your companion so that he was on top
        return instance.put<GetMessagesItemsResponseType>(`dialogs/${userId}`)
            .then(response => response.data)
    },

    

    sendMessage(userId: number, body: string) {                            //send message to your friend
        return instance.post(`dialogs/${userId}/messages`, { body: body })
            .then(res => res.data)
    },

    isMessageViewed(messageId: number) {                                //is your message viewed
        return instance.get(`dialogs/messages/${messageId}/viewed`)
            .then(res => res.data)
    },

    spamMessage(messageId: number) {
        return instance.post(`dialogs/messages/${messageId}/spam`)
            .then(res => res.data)
    },

    deleteMessage(messageId: number) {                                  //delete only for you, not for your companion
        return instance.delete(`dialogs/messages/${messageId}`)
            .then(res => res.data) as Promise<APIResponseType>
    },

    restoreMessageForm(messageId: number) {                             //restore your message form deleted and spam
        return instance.put(`dialogs/messages/${messageId}/restore`)
            .then(res => res.data)
    },

    getMessagesOnDate(userId: number, date: string) {                             //return messages newest than date
        return instance.put(`dialogs/${userId}/messages/new?newerThen=${date}`)
            .then(res => res.data)
    },

    getNewMessagesCount() {                             //list of new messages
        return instance.get(`dialogs/messages/new/count`)
            .then(res => res.data)
    },

    // getUsers(currentPage = 1, pageSize = 3, term = '', friend:null|boolean=null) {
    //     return instance.get<GetMessagesItemsResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '': `&friend=${friend}`))
    //         .then(response => response.data)
    // },

    // followUsers(id: number) {
    //     return instance.post<APIResponseType>(`follow/${id}`)
    //     .then(response => {
    //             return response.data
    //         })
    // },

    // unfollowUsers(id: number) {
    //     return instance.delete<APIResponseType>(`follow/${id}`)
    //         .then(response => response.data) as Promise<APIResponseType>
    // },
}
