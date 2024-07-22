import React from 'react';
import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";
import MessageItem from "./MessageItem/MessageItem";
import DialogItem from "./DialogItem/DialogItem";


const Dialogs = (props) => {


    let dialogsItemDataElements = props.state.dialogs.map(el =>
        (<DialogItem nameuser={el.name} id_user={el.id}/>)
    )

    let messageElements = props.state.messages.map(el =>
        (<MessageItem message={el.message}/>)
    )

    let newSendElement = React.createRef();

    let send = () => {
        let text = newSendElement.current.value;
        alert(text);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_items}>
                <div className={s.users}>
                    {dialogsItemDataElements}
                </div>
                <div className={s.messages}>
                    {messageElements}
                </div>
                <div className={s.messages_area}>
                    <textarea ref={newSendElement}></textarea>
                    <div>
                        <button onClick={send}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dialogs;
