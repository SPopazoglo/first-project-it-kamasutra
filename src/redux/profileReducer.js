import { profileAPI, usersAPI } from '../api/api'

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'

let initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likesCount: 5 },
    { id: 2, message: "Hello! It's my first post", likesCount: 10 },
    { id: 3, message: 'blalba', likesCount: 3 },
    { id: 4, message: 'yess!!!', likesCount: 105 },
  ],
  profile: null,
  status: '',
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
      }
      return {
        ...state,
        posts: [...state.posts, newPost],
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((p) => p.id != action.postId),
      }
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      }
    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      }
    default:
      return state
  }
}

export const addPostActionCreator = (newPostText) => ({
  type: ADD_POST,
  newPostText,
})

export const deletePost = (postId) => ({
  type: DELETE_POST,
  postId,
})

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })

export const getUserProfile = (userId) => async (dispatch) => {
  const data = await usersAPI.getProfile(userId)
  dispatch(setUserProfile(data))
}

export const setStatus = (status) => ({ type: SET_STATUS, status })

export const getStatus = (userId) => async (dispatch) => {
  const data = await profileAPI.getStatus(userId)
  dispatch(setStatus(data))
}

export const updateStatus = (status) => async (dispatch) => {
  const data = await profileAPI.updateStatus(status)
  if (data.resultCode === 0) {
    dispatch(setStatus(status))
  }
}

export default profileReducer
