import React from 'react';
import s from './Dialogs.module.css';
import MessageItem from "./MessageItem/MessageItem";
import DialogItem from "./DialogItem/DialogItem";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../utils/validators/validator";

const Dialogs = (props) => {

    let dialogsItemDataElements = props.dialogPage.dialogs.map(el =>
        (<DialogItem nameuser={el.name} id_user={el.id} key={el.id}/>)
    )

    let messageElements = props.dialogPage.messages.map(el =>
        (<MessageItem message={el.message} key={el.id}/>)
    )

    let addMessage = (values) => {
        props.sendMessageText(values.newMessageText)
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
                        <AddMessageFormReduxForm onSubmit={addMessage}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
const maxLength10 = maxLengthCreator(10)
const AddMessageForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field component={Textarea} validate={[required, maxLength10]} name={'newMessageText'}
                           placeholder={'Enter your message'}/>
                    <div>
                        <button onClick={() => {
                        }}>Send
                        </button>
                    </div>
                </div>
            </form>

        </div>
    )
}
const AddMessageFormReduxForm = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)
export default Dialogs;
