import {combineReducers, createStore} from "redux";
import ProfileReducer from "./ProfileReducer";
import NavBarReducer from "./NavBarReducer";
import DialogsReducer from "./DialogsReducer";
import FindUsersReducer from "./FindUsersReducer";

let reducers = combineReducers({
    profilePage: ProfileReducer,
    dialogPage: DialogsReducer,
    navBar: NavBarReducer,
    findUsersPage: FindUsersReducer,
})

let store = createStore(reducers)

window.store = store

export default store