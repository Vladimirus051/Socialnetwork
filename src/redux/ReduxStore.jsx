import {combineReducers, createStore} from "redux";
import ProfileReducer from "./ProfileReducer";
import NavBarReducer from "./NavBarReducer";
import DialogsReducer from "./DialogsReducer";
import FindUsersReducer from "./FindUsersReducer";
import authReducer from "./authReducer";

let reducers = combineReducers({
    profilePage: ProfileReducer,
    dialogPage: DialogsReducer,
    navBar: NavBarReducer,
    findUsersPage: FindUsersReducer,
    auth: authReducer,
})

let store = createStore(reducers)

window.store = store

export default store