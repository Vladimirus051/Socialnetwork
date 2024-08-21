import React from 'react';
import s from './Dialogs.module.css';
import MessageItem from "./MessageItem/MessageItem";
import DialogItem from "./DialogItem/DialogItem";

const Dialogs = (props) => {

    let dialogsItemDataElements = props.dialogPage.dialogs.map(el =>
        (<DialogItem nameuser={el.name} id_user={el.id} key={el.id}/>)
    )

    let messageElements = props.dialogPage.messages.map(el =>
        (<MessageItem message={el.message} key={el.id}/>)
    )

    let newSendElement = React.createRef();

    let SendMessage = () => {
        props.sendMessageText()
        props.updateNewMessageText('')
    }

    let onMessageChange = () => {
        let text = newSendElement.current.value;
        props.updateNewMessageText(text)
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
                    <div className={s.messages_text}>
                        <textarea ref={newSendElement}
                                  onChange={onMessageChange}
                                  value={props.dialogPage.newMessageText}
                                  placeholder={'Enter your message'}/>
                    </div>
                    <div>
                        <button onClick={SendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dialogs;
