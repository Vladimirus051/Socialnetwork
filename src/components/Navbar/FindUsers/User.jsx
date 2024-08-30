import React from "react";
import s from "./FindUsers.module.css";
import userPhoto from "../../../assets/images/users_asset_image.png";
import {NavLink} from "react-router-dom";

const User = ({followingInProgress, unFollow, follow, user}) => {
    return (
        <div>
            <span>
                    <div>
                        <NavLink to={'/profile/' + user.id} className={s.users}>
                            <img className={s.users_photo}
                                 src={user.photos.small != null ? user.photos.small : userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed ?
                            <button disabled={followingInProgress.some(id => id === user.id)} onClick={() =>
                                unFollow(user.id)}>Unfollow</button>
                            : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() =>
                                follow(user.id)}>Follow</button>
                        }
                    </div>
                </span>
            <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{'user.location.country'}</div>
                        <div>{'user.location.city'}</div>
                    </span>
                </span>
        </div>
    )
}

export default User