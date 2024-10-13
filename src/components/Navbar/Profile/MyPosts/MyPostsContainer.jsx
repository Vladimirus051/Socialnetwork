import {actions} from "../../../../redux/ProfileReducer.tsx";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {compose} from "redux";


let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(actions.addPost(newPostText))
        },
    }
}

const MyPostsContainer = compose(connect(mapStateToProps, mapDispatchToProps))(MyPosts)
export default MyPostsContainer;