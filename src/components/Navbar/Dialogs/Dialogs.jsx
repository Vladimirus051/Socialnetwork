import React from 'react';
import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";
import MessageItem from "./MessageItem/MessageItem";
import DialogItem from "./DialogItem/DialogItem";


const Dialogs = (props) => {

    let dialogs = [
        {id: 1, name: 'Dima'},
        {id: 2, name: 'Nika'},
        {id: 3, name: 'Roba'},
        {id: 4, name: 'Koly'},
        {id: 5, name: 'Vicha'},
        {id: 6, name: 'Pol'}
    ]

    let messages = [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How r u?'},
        {id: 3, message: 'GG'},
        {id: 4, message: 'WP'},
        {id: 5, message: 'Games i like'},
        {id: 6, message: 'Minecraf'},
    ]

    let dialogsItemDataElements = dialogs.map(el =>
        (<DialogItem nameuser={el.name} id_user={el.id}/>)
    )

    let messageElements = messages.map(el =>
        (<MessageItem message={el.message}/>)
    )

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_items}>
                <div className={s.users}>
                    {dialogsItemDataElements}
                </div>
                <div className={s.messages}>
                    {messageElements}
                </div>
            </div>
        </div>
    );
}

export default Dialogs;
