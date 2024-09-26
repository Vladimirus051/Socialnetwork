export type postType = {
    id: number
    message: string
    likesCount: number
}
export type contactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type photosType = {
    small: string | null
    large: string | null
}
export type profileType = {
    userId: number | null | undefined
    lookingForAJob: boolean | null | undefined
    lookingForAJobDescription: string | null | undefined
    fullName: string | null | undefined
    contacts: contactsType | undefined
    photos: photosType
}

export type UserType = {
    id: number
    name: string
    status: string
    followed: boolean
    photos: photosType
}