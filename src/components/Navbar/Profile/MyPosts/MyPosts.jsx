import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = () => {

    let posts =[
        {id:1, message: 'How r u?', likesCount: 15},
        {id:2, message: 'It\'s my 1 post', likesCount: 122},
    ]

    let postsElements = posts.map(el =>
        (<Post message={el.message} likesCount={el.likesCount}/>)
    )

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
                <div>
                    <div>
                        <textarea></textarea>
                    </div>
                    <div>
                        <button>Add post</button>
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