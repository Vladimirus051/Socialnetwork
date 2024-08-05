import s from './MyPosts.module.css'
import Post from "./Post/Post";
import React from "react";
import {addPostsActionCreator, updateNewPostTextActionCreator} from "../../../../redux/ProfileReducer";

const MyPosts = (props) => {
    let postsElements = props.posts.map(el =>
        (<Post message={el.message} likesCount={el.likesCount}/>)
    )


    let newPostElement = React.createRef();

    let onAddPost = () => {
        props.addPost()
        props.updateNewPostText('')
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement} onChange={onPostChange}
                              value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={onAddPost}>
                        Add post
                    </button>
                    <button>Remove</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>

        </div>
    )
}
export default MyPosts;