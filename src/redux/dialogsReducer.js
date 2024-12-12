const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY'
const SEND_MESSAGE = 'SEND_MESSAGE'

let initialState = {
  dialogsData: [
    { id: 1, name: 'Bob' },
    { id: 2, name: 'Petro' },
    { id: 3, name: 'Ivan' },
    { id: 4, name: 'Vova' },
    { id: 5, name: 'Bella' },
  ],
  messagesData: [
    { id: 1, message: 'Hi!' },
    { id: 2, message: 'How is your it-kamasutra?' },
    { id: 3, message: 'Yo' },
    { id: 4, message: 'Cocca Colla' },
    { id: 5, message: 'What do you do?' },
  ],
  newMessageBody: '',
}

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      return {
        ...state,
        newMessageBody: action.body,
      }

    case SEND_MESSAGE:
      let body = state.newMessageBody
      return {
        ...state,
        newMessageBody: '',
        messagesData: [...state.messagesData, { id: 7, message: body }],
      }

    default:
      return state
  }
}

export const sendMessageCreator = () => ({ type: SEND_MESSAGE })

export const updateNewMessageBodyCreator = (body) => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  body: body,
})

export default dialogsReducer
