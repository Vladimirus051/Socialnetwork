import {addPostsActionCreator, updateNewPostTextActionCreator} from "../../../../redux/ProfileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";


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

const MyPostsContainer =
    connect(mapStateToProps, mapDispatchToProps)(MyPosts)
export default MyPostsContainer;