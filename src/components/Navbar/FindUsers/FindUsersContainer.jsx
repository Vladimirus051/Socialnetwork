import {connect} from "react-redux";
import {
    follow,
    setCurrentPage, setTotalCount,
    setUsers, toggleIsFetching, toggleIsFollowingProgress,
    unFollow,
} from "../../../redux/FindUsersReducer";
import React from "react";
import FindUsers from "./FindUsers";
import Preloader from "../../common/preloader/Preloader";
import {usersAPI} from "../../../API/api";

class FindUsersContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalCount(data.totalCount)
            }
        )
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)
        })

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
                           follow={this.props.follow}
                           unFollow={this.props.unFollow}
                           isFetching={this.props.isFetching}
                           toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
                           followingInProgress={this.props.followingInProgress}/>
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

export default connect(mapStateToProps, {
    follow,
    unFollow,
    setUsers,
    setCurrentPage,
    setTotalCount,
    toggleIsFetching,
    toggleIsFollowingProgress,
})(FindUsersContainer)

