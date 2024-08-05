const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
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
}
const DialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_TEXT: {
            return {
                ...state,
                newMessageText: action.newText
            }
        }
        case SEND_MESSAGE:
            let newMessageText = state.newMessageText
            return {
                ...state,
                messages: [...state.messages, {
                    id: 6,
                    message: newMessageText
                }],
                newMessageText: '',

            }

        default:
            return state
    }
}

export const updateNewMessageTextActionCreator = (text) => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newText: text
})

export const sendMessageTextActionCreator = () => ({
    type: SEND_MESSAGE
})

export default DialogsReducer