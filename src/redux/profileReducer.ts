import { FormAction, stopSubmit } from 'redux-form'
import { ThunkAction } from 'redux-thunk'
import { ResultCodesEnum } from '../api/api'
import { PostType, PhotosType, ProfileType } from '../../types/types'
import { AppStateType, BaseThunkType, InferActionsTypes } from './reduxStore'
import { profileAPI } from '../api/profile-api'

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

const profileReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'SN/PROFILE/ADD-POST':
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
      }
      return {
        ...state,
        posts: [...state.posts, newPost],
      }
    case 'SN/PROFILE/DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter((p) => p.id != action.postId),
      }
    case 'SN/PROFILE/SET_USER_PROFILE':
      return {
        ...state,
        profile: action.profile,
      }
    case 'SN/PROFILE/SET_STATUS':
      return {
        ...state,
        status: action.status,
      }
    case 'SN/PROFILE/SAVE_PHOTO_SUCCESS':
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      }
    default:
      return state
  }
}

export const actions = {
  addPostActionCreator: (newPostText: string) =>
    ({
      type: 'SN/PROFILE/ADD-POST',
      newPostText,
    } as const),
  deletePost: (postId: number) =>
    ({
      type: 'SN/PROFILE/DELETE_POST',
      postId,
    } as const),
  savePhotoSuccess: (photos: PhotosType) =>
    ({
      type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS',
      photos,
    } as const),
  setUserProfile: (profile: ProfileType) =>
    ({
      type: 'SN/PROFILE/SET_USER_PROFILE',
      profile,
    } as const),
  setStatus: (status: string) =>
    ({
      type: 'SN/PROFILE/SET_STATUS',
      status,
    } as const),
}

export const getUserProfile =
  (userId: number): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
  }

export const getStatus =
  (userId: number): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
  }

export const updateStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.setStatus(status))
    }
  }
export const savePhoto =
  (file: File): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.savePhotoSuccess(data.data.photos))
    }
  }
export const saveProfile =
  (profile: ProfileType): ThunkType =>
  async (dispatch, getState) => {
    const userId = getState().auth.id
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === ResultCodesEnum.Success) {
      if (userId != null) {
        dispatch(getUserProfile(userId))
      } else {
        throw new Error("userId can't be null")
      }
    } else {
      dispatch(stopSubmit('edit-profile', { _error: data.messages[0] }))
      return Promise.reject(data.messages[0])
    }
  }

export default profileReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
