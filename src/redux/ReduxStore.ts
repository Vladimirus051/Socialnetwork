import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import ProfileReducer from "./ProfileReducer.tsx";
import NavBarReducer from "./NavBarReducer";
import DialogsReducer from "./DialogsReducer.tsx";
import FindUsersReducer from "./FindUsersReducer.ts";
import authReducer from "./authReducer.ts";
import {thunk as thunkMiddleWare} from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./appReducer.ts";

let rootReducers = combineReducers({
    profilePage: ProfileReducer,
    dialogPage: DialogsReducer,
    navBar: NavBarReducer,
    findUsersPage: FindUsersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
})
type rootReducersType = typeof rootReducers
export type appStateType = ReturnType<rootReducersType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers,  composeEnhancers(applyMiddleware(thunkMiddleWare)));
// @ts-ignore
window.__store__ = store;

// @ts-ignore
window.store = store
export default store