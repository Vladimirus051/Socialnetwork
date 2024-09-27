

// @ts-ignore
import {appStateType} from "../ReduxStore";

export const getFindUsers = (state: appStateType) => {
    // @ts-ignore
    return state.findUsersPage.users
}
// @ts-ignore
export const getPageSize = (state: appStateType) => {
    // @ts-ignore
    return state.findUsersPage.pageSize
}
// @ts-ignore
export const getTotalUsersCount = (state: appStateType) => {
    // @ts-ignore
    return state.findUsersPage.totalUsersCount
}
// @ts-ignore
export const getCurrentPage = (state: appStateType) => {
    // @ts-ignore
    return state.findUsersPage.currentPage
}
// @ts-ignore
export const getIsFetching = (state: appStateType) => {
    // @ts-ignore
    return state.findUsersPage.isFetching
}
// @ts-ignore
export const getFollowingInProgress = (state: appStateType) => {
    // @ts-ignore
    return state.findUsersPage.followingInProgress
}

