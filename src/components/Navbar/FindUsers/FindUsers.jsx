import React from "react";
import Paginator from "../../common/Paginator/Paginator";
import User from "./User";

const FindUsers = ({
                       totalUsersCount, pageSize, currentPage,
                       onPageChanged, users, followingInProgress,
                       unFollow, follow,
                   }) => {
    return (
        <div>
            <div>
                <Paginator
                    totalUsersCount={totalUsersCount}
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