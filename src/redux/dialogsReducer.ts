import { InferActionsTypes } from './reduxStore'

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
    case 'SN/DIALOGS/SEND_MESSAGE':
      let body = action.newMessageBody
      return {
        ...state,
        messagesData: [...state.messagesData, { id: 7, message: body }],
      }

    default:
      return state
  }
}

export const actions = {
  sendMessage: (newMessageBody: string) =>
    ({
      type: 'SN/DIALOGS/SEND_MESSAGE',
      newMessageBody,
    } as const),
}

export default dialogsReducer

export type InitialStateType = typeof initialState
type DialogType = {
  id: number
  name: string
}
type MessageType = {
  id: number
  message: string
}
type ActionsTypes = InferActionsTypes<typeof actions>
