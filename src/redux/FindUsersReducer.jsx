const SET_USERS = 'SET_USERS';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOOGGLE_IS_FOLLOWING_PROGRESS = 'TOOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],

}

const FindUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                }),

            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                }),

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
        case TOOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOOGGLE_IS_FOLLOWING_PROGRESS:
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

export const follow = (userId) => ({
    type: FOLLOW,
    userId
})
export const unFollow = (userId) => ({
    type: UNFOLLOW,
    userId
})

export const setUsers = (users) => ({
    type: SET_USERS,
    users,
})
export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage
})
export const setTotalCount = (totalUsersCount) => ({
    type: SET_TOTAL_COUNT,
    totalUsersCount
})
export const toggleIsFetching = (isFetching) => ({
    type: TOOGGLE_IS_FETCHING,
    isFetching
})
export const toggleIsFollowingProgress = (isFetching, userId) => ({
    type: TOOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
})

export default FindUsersReducer
