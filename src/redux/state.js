const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY'
const SEND_MESSAGE = 'SEND_MESSAGE'

let store = {
  _state: {
    profilePage: {
      postsData: [
        { id: 1, message: 'Hi, how are you?', likesCount: 5 },
        { id: 2, message: "Hello! It's my first post", likesCount: 10 },
        { id: 2, message: 'blalba', likesCount: 3 },
        { id: 2, message: 'yess!!!', likesCount: 105 },
      ],
      newPostText: 'it-kamasutra.com',
    },
    dialogsPage: {
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
    },
  },
  _callSubscriber() {
    console.log('state changed')
  },

  getState() {
    return this._state
  },
  subscribe(observer) {
    this._callSubscriber = observer // наблюдатель это паттерн
  },
  dispatch(action) {
    if (action.type === ADD_POST) {
      let newPost = {
        id: 5,
        message: this._state.profilePage.newPostText,
        likesCount: 0,
      }
      this._state.profilePage.postsData.push(newPost)
      this._state.profilePage.newPostText = ''
      this._callSubscriber(this._state)
    } else if (action.type === UPDATE_NEW_POST_TEXT) {
      this._state.profilePage.newPostText = action.newText
      this._callSubscriber(this._state)
    } else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
      this._state.dialogsPage.newMessageBody = action.body
      this._callSubscriber(this._state)
    } else if (action.type === SEND_MESSAGE) {
      let body = this._state.dialogsPage.newMessageBody
      this._state.dialogsPage.newMessageBody = ''
      this._state.dialogsPage.messagesData.push({ id: 6, message: body })
      this._callSubscriber(this._state)
    }
  },
}

export const addPostActionCreator = () => ({ type: ADD_POST })

export const updateNewPostTextActionCreator = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text,
})

export const sendMessageCreator = () => ({ type: SEND_MESSAGE })

export const updateNewMessageBodyCreator = (body) => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  body: body,
})

export default store
Window.store = store
// store - OOP
