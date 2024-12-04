import dialogsReducer from './dialogsReducer'
import profileReducer from './profileReducer'
import sidebarReducer from './sidebarReducer'

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
    sidebar: {},
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
    this._state.profilePage = profileReducer(this._state.profilePage, action)
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
    this._state.sidebar = sidebarReducer(this._state.sidebar, action)

    this._callSubscriber(this._state)
  },
}

export default store
Window.store = store
// store - OOP
