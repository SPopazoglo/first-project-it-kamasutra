let rerenderEntireTree = () => {
  console.log('state changed')
}

let state = {
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
  },
}

export const addPost = () => {
  let newPost = {
    id: 5,
    message: state.profilePage.newPostText,
    likesCount: 0,
  }
  state.profilePage.postsData.push(newPost)
  state.profilePage.newPostText = ''
  rerenderEntireTree(state)
}

export const updateNewPostText = (newText) => {
  state.profilePage.newPostText = newText
  rerenderEntireTree(state)
}

export const subscribe = (observer) => {
  rerenderEntireTree = observer // наблюдатель это паттерн
}

export default state

// store - OOP
