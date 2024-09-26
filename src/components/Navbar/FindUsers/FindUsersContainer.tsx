import {connect} from "react-redux";
import {
    follow,
    followSuccess,
    getUsers,
    setCurrentPage,
    toggleIsFollowingProgress,
    unFollow,
    unFollowSuccess,
}
    from "../../../redux/FindUsersReducer.ts";
import React from "react";
import FindUsers from "./FindUsers";
import Preloader from "../../common/preloader/Preloader";
import {withAuthRedirect} from "../../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getFindUsers
} from "../../../redux/Selectors/FinUsersSelectors";
import {UserType} from "../../../types/types_for_app";

type PropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => void
    followingInProgress: Array<number>
    getUsers: (currentPage: number, pageSize: number) => void
    followSuccess: (userId: number) => void
    unFollowSuccess: (userId: number) => void
    isFetching: boolean,
}
class FindUsersContainer extends React.Component <PropsType> {
    componentDidMount() {
        let {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: Number) => {
        const {pageSize} = this.props
        // this.props.setCurrentPage(pageNumber)
        this.props.getUsers(pageNumber, pageSize)
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <FindUsers totalUsersCount={this.props.totalUsersCount}
                           pageSize={this.props.pageSize}
                           users={this.props.users}
                           currentPage={this.props.currentPage}
                           onPageChanged={this.onPageChanged}
                           followSuccess={this.props.followSuccess}
                           unFollowSuccess={this.props.unFollowSuccess}
                           isFetching={this.props.isFetching}
                           followingInProgress={this.props.followingInProgress}
                           follow={this.props.follow}
                           unFollow={this.props.unFollow}/>
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        users: getFindUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}
export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {
        followSuccess, unFollowSuccess, setCurrentPage,
        toggleIsFollowingProgress, getUsers, follow, unFollow,
    }),
)(FindUsersContainer)