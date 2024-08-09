import s from './FindUsers.module.css'
import axios from "axios";
import userPhoto from '../../../assets/images/users_asset_image.png'
import React from "react";

class FindUsers extends React.Component {

    constructor(props) {
        super(props);

        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            debugger
            this.props.setUsers(response.data.items)
        })
    }

    render() {
        return (
            <div>
                {this.props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img className={s.users_photo} src={u.photos.small != null ? u.photos.small : userPhoto}/>
                    </div>
                    <div>
                        {u.followed ? <button onClick={() => {
                                this.props.unfollow(u.id)
                            }}>Follow</button>
                            : <button onClick={() => {
                                this.props.follow(u.id)
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
        )
    }
}

export default FindUsers