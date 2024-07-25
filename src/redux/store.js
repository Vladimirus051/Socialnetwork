import ProfileReducer from "./ProfileReducer";
import DialogsReducer from "./DialogsReducer";
import NavBarReducer from "./NavBarReducer";


let store = {
    _state: {
        dialogPage: {
            dialogs: [
                {id: 1, name: 'Dima'},
                {id: 2, name: 'Nika'},
                {id: 3, name: 'Roba'},
                {id: 4, name: 'Koly'},
                {id: 5, name: 'Vicha'},
                {id: 6, name: 'Pol'}
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How r u?'},
                {id: 3, message: 'GG'},
                {id: 4, message: 'WP'},
                {id: 5, message: 'Games i like'},
                {id: 6, message: 'Minecraft'},
            ],
            newMessageText: '',
        },
        profilePage: {
            posts: [
                {id: 1, message: 'How r u?', likesCount: 15},
                {id: 2, message: 'It\'s my 1 post', likesCount: 122},
            ],
            newPostText: 'It-s my new post',
        },
        navBar: {},

    },
    _rerenderEntireTree() {
        console.log('State changed')
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._rerenderEntireTree = observer
    },

    dispatch(action) {

        this._state.profilePage = ProfileReducer(this._state.profilePage, action)
        this._state.dialogPage = DialogsReducer(this._state.dialogPage, action)
        this._state.navBar = NavBarReducer(this._state.navBar, action)

        this._rerenderEntireTree(this._state)

    },
}




export default store

window.store = store