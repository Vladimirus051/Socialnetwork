import {profileAPI} from "../API/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE-POST';
const SET_USER_PHOTO = 'SET-USER-PHOTO';

let initialState = {
    posts: [
        {id: 1, message: 'How r u?', likesCount: 15},
        {id: 2, message: 'Its my 1 post', likesCount: 122},
    ],
    newPostText: 'It-s my new post',
    profile: null,
    status: '',
    profileSaved: false
}

const ProfileReducer = (state = initialState, action) => {

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
export const setUserPhoto = (photos) => ({type: 'SET-USER-PHOTO', photos})
export const addPostsActionCreator = (newPostText) => ({type: ADD_POST, newPostText})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const deletePost = (postId) => ({type: DELETE_POST, postId: postId});

export const getUserProfile = (userId) => async (dispatch) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}
export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}
export const updateStatus = (status) => async (dispatch) => {
    try{
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }}
    catch (e) {
        console.log(e)
        debugger
    }
}
export const savePhotoFile = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(setUserPhoto(response.data.data.photos))
    }
}
export const saveProfile = (profile) => async (dispatch, getState) => {
    let response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(getState().auth.userId))
    }
    else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('edit-profile', {_error: message}))
        return Promise.reject(message)
    }
}
export default ProfileReducer