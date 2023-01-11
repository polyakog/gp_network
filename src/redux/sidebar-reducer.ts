import { PhotosType } from "../types/types"

type FriendsType = {
    friendId: number
    name: string
    photos: PhotosType | null
}

let initialState = {

    friendsData: {
        friendsId1: [
            { friendId: 2, name: "Sergey", photos: null },
            { friendId: 3, name: "Alexey", photos: null },
            { friendId: 5, name: "Andrey", photos: null },
        ] as Array<FriendsType>,
    }
}

export type InitialStateType = typeof initialState

const sidebarReducer = (state = initialState, action: any): InitialStateType => {
    return state;
}

export default sidebarReducer