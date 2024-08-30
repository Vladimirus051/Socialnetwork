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
    from "../../../redux/FindUsersReducer";
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

class FindUsersContainer extends React.Component {
    componentDidMount() {
        let {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber) => {
        let {pageSize} = this.props
        this.props.setCurrentPage(pageNumber)
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
        toggleIsFollowingProgress, getUsers, follow, unFollow
    }),
)(FindUsersContainer)