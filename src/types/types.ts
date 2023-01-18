export type PostDataType = { id: number, postId: number, message: string, likeCount: number, Name: string }

export type ContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
export type PhotosType = { small: null | string, large: null | string }

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    aboutMe:string
    photos: PhotosType
    contacts: ContactsType
}

export type UserType = {
    id: number
    name: string
    status: string
    uniqueUrlName: null | string
    photos: PhotosType
    followed: boolean
}

export type DialogDataType = {
    id: number
    name: string
}

export type MessageDataType = {
    id: number
    idMessage: number
    name: string
    text: string
}
