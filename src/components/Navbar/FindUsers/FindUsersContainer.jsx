import {connect} from "react-redux";
import {
    follow,
    setCurrentPage, setTotalCount,
    setUsers, toggleIsFetching,
    unFollow,
} from "../../../redux/FindUsersReducer";
import React from "react";
import axios from "axios";
import FindUsers from "./FindUsers";
import Preloader from "../../common/preloader/Preloader";

class FindUsersContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalCount(response.data.totalCount)
            }
        )
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(response.data.items)
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
                           isFetching={this.props.isFetching}/>
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
    }
}

export default connect(mapStateToProps, {
    follow,
    unFollow,
    setUsers,
    setCurrentPage,
    setTotalCount,
    toggleIsFetching,
})(FindUsersContainer)