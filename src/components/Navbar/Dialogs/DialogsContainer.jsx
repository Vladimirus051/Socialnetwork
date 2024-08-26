import {sendMessageTextActionCreator} from "../../../redux/DialogsReducer";
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
        sendMessageText: (newMessageText) => {
            dispatch(sendMessageTextActionCreator(newMessageText))
        },
    }
}
export default compose(withAuthRedirect, connect(mapStateToProps, mapDispatchToProps))(Dialogs);
