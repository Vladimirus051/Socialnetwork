import {addPostsActionCreator, updateNewPostTextActionCreator} from "../../../../redux/ProfileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../../../../hoc/WithAuthRedirect";


let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPostsActionCreator(newPostText))
        },
    }
}

const MyPostsContainer = compose(connect(mapStateToProps, mapDispatchToProps))(MyPosts)
export default MyPostsContainer;