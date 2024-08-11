const SET_USERS = 'SET_USERS';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,

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
        default:
            return state
    }
}

export const followActionCreator = (userId) => ({
    type: FOLLOW,
    userId
})
export const unFollowActionCreator = (userId) => ({
    type: UNFOLLOW,
    userId
})

export const setUsersActionCreator = (users) => ({
    type: SET_USERS,
    users,
})
export const setCurrentPageActionCreator = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage
})
export const setTotalCountActionCreator = (totalUsersCount) => ({
    type: SET_TOTAL_COUNT,
    totalUsersCount
})

export default FindUsersReducer
