import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../../redux/ProfileReducer";
import {useParams} from "react-router-dom";
import {withAuthRedirect} from "../../../hoc/WithAuthRedirect";
import {compose} from "redux";

export function withRouter(Children) {

    return (props) => {
        const match = {params: useParams()};
        return <Children {...props} match={match}/>
    }

}
class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = 2
        }
        this.props.getUserProfile(userId)
    }


    render() {

        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        )
    }

}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
})
export default compose(
    withRouter,
    withAuthRedirect,
    connect(mapStateToProps, {getUserProfile})
)(ProfileContainer)