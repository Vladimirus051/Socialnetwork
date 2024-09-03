import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
    getStatus,
    getUserProfile,
    savePhoto,
    savePhotoFile,
    saveProfile,
    updateStatus
} from "../../../redux/ProfileReducer";
import { compose } from "redux";
import withRouter from "../../../withRouter";
import { Navigate } from "react-router-dom";

class ProfileContainer extends React.Component {

    refreshProfile = () => {
        let userId = this.props.router.params.userId || this.props.authorizedUserId;

        if (!userId) {
            console.log("Redirecting to /login with Navigate");
            return; // Прерываем дальнейшее выполнение componentDidMount
        }

        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }
    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.router.params.userId !== this.props.router.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        if (!this.props.router.params.userId && !this.props.authorizedUserId) {
            return <Navigate to="/login" />;
        }
        return (
            <div>
                <Profile {...this.props} saveProfile={this.props.saveProfile} savePhotoFile={this.props.savePhotoFile} isOwner={!this.props.router.params.userId} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});

export default compose(
    withRouter,
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhotoFile, saveProfile}),
)(ProfileContainer);
