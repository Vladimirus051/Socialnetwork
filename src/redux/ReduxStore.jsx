import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import ProfileReducer from "./ProfileReducer";
import NavBarReducer from "./NavBarReducer";
import DialogsReducer from "./DialogsReducer.tsx";
import FindUsersReducer from "./FindUsersReducer";
import authReducer from "./authReducer";
import {thunk as thunkMiddleWare} from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./appReducer";

let reducers = combineReducers({
    profilePage: ProfileReducer,
    dialogPage: DialogsReducer,
    navBar: NavBarReducer,
    findUsersPage: FindUsersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,  composeEnhancers(applyMiddleware(thunkMiddleWare)));
window.__store__ = store;

window.store = store
export default store