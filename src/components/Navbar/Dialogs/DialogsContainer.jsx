import {sendMessageTextActionCreator, updateNewMessageTextActionCreator} from "../../../redux/DialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
    return {
        dialogPage: state.dialogPage
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        updateNewMessageText: (text) => {
            dispatch(updateNewMessageTextActionCreator(text))
        },
        sendMessageText: () => {
            dispatch(sendMessageTextActionCreator())
        },
    }
}

const DialogsContainer =
    connect(mapStateToProps, mapDispatchToProps)(Dialogs)
export default DialogsContainer;
