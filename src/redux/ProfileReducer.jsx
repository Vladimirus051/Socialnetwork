import {profileAPI} from "../API/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';

let initialState = {
    posts: [
        {id: 1, message: 'How r u?', likesCount: 15},
        {id: 2, message: 'It\'s my 1 post', likesCount: 122},
    ],
    newPostText: 'It-s my new post',
    profile: null,
    status: '',
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
        default:
            return state
    }
}

export const addPostsActionCreator = (newPostText) => ({
    type: ADD_POST,
    newPostText
})

export const setStatus = (status) => ({
    type: SET_STATUS,
    status
})
export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile
})
export const getUserProfile = (userId) =>
    (dispatch) => {
        profileAPI.getProfile(userId).then(response => {
            dispatch(setUserProfile(response.data))
        })
    }
export const getStatus = (userId) =>
    (dispatch) => {
        profileAPI.getStatus(userId).then(response => {
            dispatch(setStatus(response.data))
        })
    }
export const updateStatus = (status) =>
    (dispatch) => {
        profileAPI.updateStatus(status).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        })
    }
export default ProfileReducer