const SEND_MESSAGE = 'SEND_MESSAGE'

export type InitialStateType = typeof initialState
type ActionsTypes = SendMessageCreatorActionType

type DialogType = {
  id: number
  name: string
}
type MessageType = {
  id: number
  message: string
}

const initialState = {
  dialogsData: [
    { id: 1, name: 'Bob' },
    { id: 2, name: 'Petro' },
    { id: 3, name: 'Ivan' },
    { id: 4, name: 'Vova' },
    { id: 5, name: 'Bella' },
  ] as Array<DialogType>,
  messagesData: [
    { id: 1, message: 'Hi!' },
    { id: 2, message: 'How is your it-kamasutra?' },
    { id: 3, message: 'Yo' },
    { id: 4, message: 'Cocca Colla' },
    { id: 5, message: 'What do you do?' },
  ] as Array<MessageType>,
}

const dialogsReducer = (state = initialState, action: ActionsTypes) => {
  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.newMessageBody
      return {
        ...state,
        messagesData: [...state.messagesData, { id: 7, message: body }],
      }

    default:
      return state
  }
}

type SendMessageCreatorActionType = {
  type: typeof SEND_MESSAGE
  newMessageBody: string
}

export const sendMessageCreator = (
  newMessageBody: string
): SendMessageCreatorActionType => ({
  type: SEND_MESSAGE,
  newMessageBody,
})

export default dialogsReducer
