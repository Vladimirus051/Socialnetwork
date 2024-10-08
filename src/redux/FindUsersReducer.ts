import {updateObjectInArray} from "../utils/objectsHelpers";
import {UserType} from "../types/types_for_app";
import {InferActionTypes, appStateType} from "./ReduxStore";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {followAPI, usersAPI} from "../API/users-api";

const SET_USERS = 'my-new-app/FindUsersReducer/SET_USERS';
const FOLLOW = 'my-new-app/FindUsersReducer/FOLLOW';
const UNFOLLOW = 'my-new-app/FindUsersReducer/UNFOLLOW';
const SET_CURRENT_PAGE = 'my-new-app/FindUsersReducer/SET-CURRENT-PAGE';
const SET_TOTAL_COUNT = 'my-new-app/FindUsersReducer/SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'my-new-app/FindUsersReducer/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'my-new-app/FindUsersReducer/TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number>,
}
type initialStateType = typeof initialState
const FindUsersReducer = (state = initialState, action: ActionsType): initialStateType => {
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
type ActionsType = InferActionTypes<typeof actions>

export const actions = {
    followSuccess: (userId: number) => ({
        type: FOLLOW,
        userId
    } as const),
    unFollowSuccess: (userId: number) => ({
        type: UNFOLLOW,
        userId
    } as const),
    setUsers: (users: Array<UserType>) => ({
        type: SET_USERS,
        users
    } as const),
    setCurrentPage: (currentPage: number) => ({
        type: SET_CURRENT_PAGE,
        currentPage
    } as const),
    setTotalCount: (totalUsersCount: number) => ({
        type: SET_TOTAL_COUNT,
        totalUsersCount
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: TOGGLE_IS_FETCHING,
        isFetching
    } as const),
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId
    } as const)

}

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true))
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalCount(data.totalCount))
    }
}
type DispatchType = Dispatch<ActionsType>
type ThunkType = ThunkAction<Promise<void>, appStateType, unknown, ActionsType>
const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod:
    (userId: number) => Promise<any>, actionCreator: (userId: number) => ActionsType) => {
    dispatch(actions.toggleIsFollowingProgress(true, userId))
    let data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleIsFollowingProgress(false, userId))
}
export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, followAPI.followUser.bind(usersAPI), actions.followSuccess)
    }
}
export const unFollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, followAPI.unFollowUser.bind(usersAPI), actions.unFollowSuccess)
    }
}
export default FindUsersReducer