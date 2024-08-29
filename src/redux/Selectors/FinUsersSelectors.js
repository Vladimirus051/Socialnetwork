export const getFindUsers = (state) => {
    return state.findUsersPage.users
}
export const getPageSize = (state) => {
    return state.findUsersPage.pageSize
}
export const getTotalUsersCount = (state) => {
    return state.findUsersPage.totalUsersCount
}
export const getCurrentPage = (state) => {
    return state.findUsersPage.currentPage
}
export const getIsFetching = (state) => {
    return state.findUsersPage.isFetching
}
export const getFollowingInProgress = (state) => {
    return state.findUsersPage.followingInProgress
}

