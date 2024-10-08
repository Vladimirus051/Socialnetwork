import {stopSubmit} from "redux-form";
import {photosType, postType, profileType} from "../types/types_for_app";
import {profileAPI} from "../API/profile-api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE-POST';
const SET_USER_PHOTO = 'SET-USER-PHOTO';

let initialState = {
    posts: [
        {id: 1, message: 'How r u?', likesCount: 15},
        {id: 2, message: 'Its my 1 post', likesCount: 122},
    ] as Array<postType>,
    newPostText: 'It-s my new post',
    profile: null as profileType | null,
    status: '',
    profileSaved: false
}
export type initialStateType = typeof initialState

const ProfileReducer = (state: initialStateType = initialState, action: any) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            }

        }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        case SET_USER_PHOTO:
            return {...state, profile: {...state.profile, photos: action.photos}}
        default:
            return state
    }
}

type setUserPhotoActionType = {
    type: typeof SET_USER_PHOTO
    photos: photosType
}
export const setUserPhoto = (photos: photosType): setUserPhotoActionType => ({type: 'SET-USER-PHOTO', photos})
type AddPostActionType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostsActionCreator = (newPostText: string): AddPostActionType => ({type: ADD_POST, newPostText})
type setStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): setStatusActionType => ({type: SET_STATUS, status})
type setUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: profileType
}
export const setUserProfile = (profile: profileType): setUserProfileActionType => ({type: SET_USER_PROFILE, profile})
type deletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): deletePostActionType => ({type: DELETE_POST, postId: postId});

export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data as profileType))
}
export const getStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}
export const updateStatus = (status: string) => async (dispatch: any) => {
    try {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    } catch (e) {
        console.log(e)
        debugger
    }
}
export const savePhotoFile = (file: File) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(setUserPhoto(response.data.data.photos))
    }
}
export const saveProfile = (profile: profileType) => async (dispatch: any, getState: any) => {
    let response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(getState().auth.userId))
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('edit-profile', {_error: message}))
        return Promise.reject(message)
    }
}
export default ProfileReducer