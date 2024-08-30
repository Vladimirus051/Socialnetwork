import s from "./Paginator.module.css"
import React from "react";

const Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return <div>
        {pages.map(p => {
            return <div style={{display: "inline-block"}}
                        className={currentPage === p && s.selectedPage} onClick={
                (e) => {
                    onPageChanged(p)
                }}>{p}</div>
        })}
    </div>
}
export default Paginator