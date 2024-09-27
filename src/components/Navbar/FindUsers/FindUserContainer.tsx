import React from 'react';
import {compose} from 'redux';
import {
    follow,
    followSuccess,
    getUsers,
    setCurrentPage,
    toggleIsFollowingProgress,
    unFollow,
    unFollowSuccess,
} from '../../../redux/FindUsersReducer.ts';
import FindUsers from './FindUsers';
import Preloader from '../../common/preloader/Preloader';
import {withAuthRedirect} from '../../../hoc/WithAuthRedirect';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getFindUsers
} from '../../../redux/Selectors/FinUsersSelectors.ts';

import {connect} from "react-redux";
import {appStateType} from "../../../redux/ReduxStore";

type PropsType = {
    users: any
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    isFetching: boolean
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    followSuccess: () => void
    unFollowSuccess: () => void
    getUsers: (currentPage: number, pageSize: number) => void
}
class FindUsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber:number) => {
        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <FindUsers
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    users={this.props.users}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    // @ts-ignore
                    followSuccess={this.props.followSuccess}
                    unFollowSuccess={this.props.unFollowSuccess}
                    isFetching={this.props.isFetching}
                    followingInProgress={this.props.followingInProgress}
                    follow={this.props.follow}
                    unFollow={this.props.unFollow}
                />
            </>
        );
    }
}

const mapStateToProps = (state: appStateType) => ({
    users: getFindUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
});

export default compose(
    withAuthRedirect,
    // @ts-ignore
    connect(mapStateToProps, {
        followSuccess,
        unFollowSuccess,
        setCurrentPage,
        toggleIsFollowingProgress,
        getUsers,
        follow,
        unFollow
    })
)(FindUsersContainer);
