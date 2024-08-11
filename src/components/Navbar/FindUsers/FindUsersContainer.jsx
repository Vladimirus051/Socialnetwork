import {connect} from "react-redux";

import {
    followActionCreator,
    setCurrentPageActionCreator, setTotalCountActionCreator,
    setUsersActionCreator,
    unFollowActionCreator
} from "../../../redux/FindUsersReducer";
import FindUsersAPIComponent from "./FindUsersAPIComponent";

let mapStateToProps = (state) => {
    return {
        users: state.findUsersPage.users,
        pageSize: state.findUsersPage.pageSize,
        totalUsersCount: state.findUsersPage.totalUsersCount,
        currentPage: state.findUsersPage.currentPage,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followActionCreator(userId))
        },
        unfollow: (userId) => {
            dispatch(unFollowActionCreator(userId))
        },
        setUsers: (users) => {
            dispatch(setUsersActionCreator(users))

        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageActionCreator(pageNumber))
        },
        setTotalCount: (totalCount) => {
            dispatch(setTotalCountActionCreator(totalCount))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FindUsersAPIComponent)