import React from "react";
import s from "./FindUsers.module.css";
import userPhoto from "../../../assets/images/users_asset_image.png";

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
                    {pages.map(p => {
                        return (
                            <span className={props.currentPage === p && s.selectedPage} onClick={
                                (e) => {
                                    props.onPageChanged(p)
                                }}>{p}</span>)
                    })}
                    {/*<span className={s.selectedPage}>2</span>*/}
                    {/*<span>3</span>*/}
                    {/*<span>4</span>*/}
                    {/*<span>5</span>*/}
                </div>
                {props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img className={s.users_photo} src={u.photos.small != null ? u.photos.small : userPhoto}/>
                    </div>
                    <div>
                        {u.followed ? <button onClick={() => {
                                props.unfollow(u.id)
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