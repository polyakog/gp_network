import { PhotosType } from "../types/types"

export type FriendsType = {
    Id: number
    name: string
    photos: PhotosType | null
}

let initialState = {

    friendsData: {
        friendsId1: [
            { Id: 2, name: "Sergey", photos: null },
            { Id: 3, name: "Alexey", photos: null },
            { Id: 5, name: "Andrey", photos: null },
        ] as Array<FriendsType>,
    }
}

export type InitialStateType = typeof initialState

const sidebarReducer = (state = initialState, action: any): InitialStateType => {
    return state;
}

export default sidebarReducer