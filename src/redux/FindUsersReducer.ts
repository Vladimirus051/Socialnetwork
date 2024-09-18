import {followAPI, usersAPI} from "../API/api";
import {updateObjectInArray} from "../utils/objectsHelpers";
import {photosType, User} from "../types/types_for_app";

const SET_USERS = 'my-new-app/FindUsersReducer/SET_USERS';
const FOLLOW = 'my-new-app/FindUsersReducer/FOLLOW';
const UNFOLLOW = 'my-new-app/FindUsersReducer/UNFOLLOW';
const SET_CURRENT_PAGE = 'my-new-app/FindUsersReducer/SET-CURRENT-PAGE';
const SET_TOTAL_COUNT = 'my-new-app/FindUsersReducer/SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'my-new-app/FindUsersReducer/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'my-new-app/FindUsersReducer/TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
    users: [] as Array<User>,
    pageSize: 10 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number>,

}
type initialStateType = typeof initialState
const FindUsersReducer = (state = initialState, action): initialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true}),
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false}),
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

type followSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}

export const followSuccess = (userId): followSuccessActionType => ({
    type: FOLLOW,
    userId
})
type unFollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unFollowSuccess = (userId): unFollowSuccessActionType => ({
    type: UNFOLLOW,
    userId
})
type setCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number

}
export const setUsers = (users): setCurrentPageActionType => ({
    type: SET_USERS,
    users,
})
type setTotalCountActionType = {
    type: typeof SET_TOTAL_COUNT
    totalUsersCount: number
}
export const setCurrentPage = (currentPage): setTotalCountActionType => ({
    type: SET_CURRENT_PAGE,
    currentPage
})
type toggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const setTotalCount = (totalUsersCount): toggleIsFetchingActionType => ({
    type: SET_TOTAL_COUNT,
    totalUsersCount
})
type toggleIsFetchingProgressActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching): toggleIsFetchingProgressActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})
type toggleIsFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleIsFollowingProgress = (isFetching, userId): toggleIsFollowingProgressActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
})
export const getUsers = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalCount(data.totalCount))
    }
}
const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleIsFollowingProgress(true, userId))
    let data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleIsFollowingProgress(false, userId))
}
export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, followAPI.followUser.bind(usersAPI), followSuccess)
    }
}
export const unFollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, followAPI.unFollowUser.bind(usersAPI), unFollowSuccess)
    }
}
export default FindUsersReducer
