import { stopSubmit } from 'redux-form'
import { profileAPI, ResultCodesEnum, usersAPI } from '../api/api'
import {
  PostType,
  ContactsType,
  PhotosType,
  ProfileType,
} from '../../types/types'
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from './reduxStore'

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

let initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likesCount: 5 },
    { id: 2, message: "Hello! It's my first post", likesCount: 10 },
    { id: 3, message: 'blalba', likesCount: 3 },
    { id: 4, message: 'yess!!!', likesCount: 105 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '',
}

export type InitialStateType = typeof initialState
type ActionsTypes =
  | AddPostActionCreatorActionType
  | DeletePostActionType
  | SavePhotoSuccessActionType
  | SetUserProfileActionType
  | SetStatusActionType

const profileReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
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
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      }
    default:
      return state
  }
}

type AddPostActionCreatorActionType = {
  type: typeof ADD_POST
  newPostText: string
}
export const addPostActionCreator = (
  newPostText: string
): AddPostActionCreatorActionType => ({
  type: ADD_POST,
  newPostText,
})

type DeletePostActionType = {
  type: typeof DELETE_POST
  postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({
  type: DELETE_POST,
  postId,
})

type SavePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS
  photos: PhotosType
}
export const savePhotoSuccess = (
  photos: PhotosType
): SavePhotoSuccessActionType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
})

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE
  profile: ProfileType
}
export const setUserProfile = (
  profile: ProfileType
): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile })

export const getUserProfile = (userId: number) => async (dispatch: any) => {
  const data = await usersAPI.getProfile(userId)
  dispatch(setUserProfile(data))
}

type SetStatusActionType = {
  type: typeof SET_STATUS
  status: string
}
export const setStatus = (status: string): SetStatusActionType => ({
  type: SET_STATUS,
  status,
})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getStatus =
  (userId: number): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(setStatus(data))
  }

export const updateStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(setStatus(status))
    }
  }
export const savePhoto =
  (file: any): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(savePhotoSuccess(data.photos))
    }
  }
export const saveProfile =
  (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.id
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(getUserProfile(userId))
    } else {
      dispatch(stopSubmit('edit-profile', { _error: data.messages[0] }))
      return Promise.reject(data.messages[0])
    }
  }

export default profileReducer
