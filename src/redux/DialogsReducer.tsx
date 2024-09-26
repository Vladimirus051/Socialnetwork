const SEND_MESSAGE = 'SEND-MESSAGE';

type SEND_MESSAGE_TYPE = {
    type: typeof SEND_MESSAGE
    newMessageText: string
}
type DialogType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}
let initialState = {
    dialogs: [
        {id: 1, name: 'Dima'},
        {id: 2, name: 'Nika'},
        {id: 3, name: 'Roba'},
        {id: 4, name: 'Koly'},
        {id: 5, name: 'Vicha'},
        {id: 6, name: 'Pol'}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How r u?'},
        {id: 3, message: 'GG'},
        {id: 4, message: 'WP'},
        {id: 5, message: 'Games i like'},
        {id: 6, message: 'Minecraft'},
    ] as Array<MessageType>,
}


const DialogsReducer = (state: typeof initialState = initialState, action: SEND_MESSAGE_TYPE) => {

    switch (action.type) {
        case SEND_MESSAGE:
            let newMessageText = action.newMessageText
            return {
                ...state,
                messages: [...state.messages, {
                    id: 6,
                    message: newMessageText,
                }],

            }

        default:
            return state
    }
}

export const sendMessageTextActionCreator = (newMessageText: string): SEND_MESSAGE_TYPE => ({
    type: SEND_MESSAGE,
    newMessageText
})

export default DialogsReducer