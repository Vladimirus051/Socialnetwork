import React from "react";

const MessageItem = (props) => {
    return (
        <div>
            <li>
                {props.message}
            </li>
        </div>
    )
}

export default MessageItem