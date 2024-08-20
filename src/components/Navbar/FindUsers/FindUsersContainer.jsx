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
import {render} from "@testing-library/react";
import {compose} from "redux";

class FindUsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }
    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        this.props.getUsers(pageNumber, this.props.pageSize)
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
        users: state.findUsersPage.users,
        pageSize: state.findUsersPage.pageSize,
        totalUsersCount: state.findUsersPage.totalUsersCount,
        currentPage: state.findUsersPage.currentPage,
        isFetching: state.findUsersPage.isFetching,
        followingInProgress: state.findUsersPage.followingInProgress
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {followSuccess, unFollowSuccess, setCurrentPage,
        toggleIsFollowingProgress, getUsers, follow, unFollow}),
)(FindUsersContainer)