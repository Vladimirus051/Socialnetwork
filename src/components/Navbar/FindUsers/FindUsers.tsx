import Paginator from "../../common/Paginator/Paginator.tsx";
import React from "react";
import {UserType} from "../../../types/types_for_app";
import User from "./User";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void,
    users: Array<UserType>
    followingInProgress: Array<number>,
    unFollow: (userId: number) => void
    follow: (userId: number) => void
}
const FindUsers: React.FC<PropsType> = ({
                                            totalUsersCount, pageSize, currentPage,
                                            onPageChanged, users, followingInProgress,
                                            unFollow, follow,
                                        }) => {
    return (
        <div>
            <div>
                <Paginator
                    totalItemsCount={totalUsersCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChanged={onPageChanged}/>
            </div>
            {users.map(u => <User user={u} followingInProgress={followingInProgress} unFollow={unFollow}
                                  follow={follow} key={u.id}/>)}
        </div>
    )
}

export default FindUsers