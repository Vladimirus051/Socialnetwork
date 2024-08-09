import {connect} from "react-redux";
import FindUsers from "./FindUsers";
import {followActionCreator, setUsersActionCreator, unFollowActionCreator} from "../../../redux/FindUsersReducer";

let mapStateToProps = (state) => {
    return {
        users: state.findUsersPage.users

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
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FindUsers)