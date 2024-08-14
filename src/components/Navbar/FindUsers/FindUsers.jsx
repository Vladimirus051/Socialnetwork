import React from "react";
import s from "./FindUsers.module.css";
import userPhoto from "../../../assets/images/users_asset_image.png";
import {NavLink} from "react-router-dom";

const FindUsers = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div>
                <div>
                    <div className={s.selectedPages}>
                        {pages.map(p => {
                            return <div style={{display: "inline-block"}}
                                        className={props.currentPage === p && s.selectedPage} onClick={
                                (e) => {
                                    props.onPageChanged(p)
                                }}>{p}</div>
                        })}
                    </div>
                </div>
                {props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id} className={s.users}>
                            <img className={s.users_photo} src={u.photos.small != null ? u.photos.small : userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed ? <button onClick={() => {
                                props.unFollow(u.id)
                            }}>Follow</button>
                            : <button onClick={() => {
                                props.follow(u.id)
                            }}>Unfollow</button>}
                        </div>
                </span>
                    <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </span>
                </span>
                </div>)}
            </div>
        </div>
    )
}

export default FindUsers