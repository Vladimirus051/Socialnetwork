import {sendMessageTextActionCreator, updateNewMessageTextActionCreator} from "../../../redux/DialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../../hoc/WithAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        dialogPage: state.dialogPage,
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
export default compose(withAuthRedirect, connect(mapStateToProps, mapDispatchToProps))(Dialogs);
