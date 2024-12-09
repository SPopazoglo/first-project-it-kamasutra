const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

let initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likesCount: 5 },
    { id: 2, message: "Hello! It's my first post", likesCount: 10 },
    { id: 2, message: 'blalba', likesCount: 3 },
    { id: 2, message: 'yess!!!', likesCount: 105 },
  ],
  newPostText: 'it-kamasutra.com',
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: state.newPostText,
        likesCount: 0,
      }
      let stateCopy = { ...state }
      stateCopy.posts = [...state.posts]
      stateCopy.posts.push(newPost)
      stateCopy.newPostText = ''
      return stateCopy
    }
    case UPDATE_NEW_POST_TEXT:
      let stateCopy = { ...state }

      stateCopy.newPostText = action.newText
      return stateCopy
    default:
      return state
  }
}

export const addPostActionCreator = () => ({ type: ADD_POST })
export const updateNewPostTextActionCreator = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text,
})

export default profileReducer
