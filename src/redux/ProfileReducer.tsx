import {stopSubmit} from "redux-form";
import {photosType, postType, profileType} from "../types/types_for_app";
import {profileAPI} from "../API/profile-api";
import {BaseThunkType, InferActionTypes} from "./ReduxStore";

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
export const actions = {
    addPost: (newPostText: string) => ({type: ADD_POST, newPostText} as const),
    setUserProfile: (profile: profileType) => ({type: SET_USER_PROFILE, profile} as const),
    setStatus: (status: string) => ({type: SET_STATUS, status} as const),
    deletePost: (postId: number) => ({type: DELETE_POST, postId: postId} as const),
    setUserPhoto: (photos: photosType) => ({type: SET_USER_PHOTO, photos} as const)
}
type ActionType = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionType | ReturnType<typeof stopSubmit>>

const ProfileReducer = (state: initialStateType = initialState, action: ActionType) => {

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

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(response.data as profileType))
}
export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(response.data))
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(actions.setStatus(status))
        }
    } catch (e) {
        console.log(e)
        debugger
    }
}
export const savePhotoFile = (file: File): ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(actions.setUserPhoto(response.data.data.photos))
    }
}
export const saveProfile = (profile: profileType): ThunkType => async (dispatch, getState) => {
    let userId = (getState().auth as { userId: number | null }).userId;
    let response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        if (userId !== null) {
            await dispatch(getUserProfile(userId))
        }
        else {
            throw new Error("userId can't be null")
        }
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('edit-profile', {_error: message}))
        return Promise.reject(message)
    }
}
export default ProfileReducer