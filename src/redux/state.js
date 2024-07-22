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
    getState() {
        debugger
        return this._state
    },
    _rerenderEntireTree() {
        console.log('State changed')
    },
    addPost() {
        debugger
        let newPost = {
            id: 5,
            message: this._state.profilePage.newPostText,
            likesCount: 0,
        };

        this._state.profilePage.posts.push(newPost);
        this._rerenderEntireTree(this._state)
    },
    updateNewPostText(newText) {
        this._state.profilePage.newPostText = newText;
        this._rerenderEntireTree(this._state)
    },
    subscribe(observer) {
        this._rerenderEntireTree = observer
    },
}

export default store

window.store = store