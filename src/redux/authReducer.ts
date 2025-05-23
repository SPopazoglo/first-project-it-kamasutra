import { stopSubmit } from 'redux-form'
import {
  authAPI,
  ResultCodeForCaptcha,
  ResultCodesEnum,
  securityAPI,
} from '../api/api'
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from './reduxStore'

const SET_USERS_DATA = 'samurai-network/auth/SET_USERS_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS'

const initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isFetching: false,
  isAuth: false,
  captchaURL: null as string | null,
}

export type InitialStateType = typeof initialState

type ActionsTypes = SetAuthUsersDataActionType | GetCaptchaUrlSuccessActionType

const authReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case SET_USERS_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}

type SetAuthUsersDataActionType = {
  type: typeof SET_USERS_DATA
  payload: {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
  }
}

export const setAuthUsersData = (
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): SetAuthUsersDataActionType => ({
  type: SET_USERS_DATA,
  payload: { id, email, login, isAuth },
})

type GetCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS
  payload: { captchaURL: string }
}

export const getCaptchaUrlSuccess = (
  captchaURL: string
): GetCaptchaUrlSuccessActionType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaURL },
})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  const meData = await authAPI.me()
  if (meData.resultCode === ResultCodesEnum.Success) {
    let { id, login, email } = meData.data
    dispatch(setAuthUsersData(id, email, login, true))
  }
}

export const login =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
  ) =>
  async (dispatch: any) => {
    const loginData = await authAPI.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthUserData())
    } else {
      if (loginData.resultCode === ResultCodeForCaptcha.CapthaIsReguired) {
        dispatch(getCaptchaURL())
      }
      let message =
        loginData.messages.length > 0 ? loginData.messages[0] : 'Some error'
      dispatch(stopSubmit('login', { _error: message }))
    }
  }

export const getCaptchaURL = (): ThunkType => async (dispatch) => {
  const data = await securityAPI.getCaptchaURL()
  const captchaURL = data.url
  dispatch(getCaptchaUrlSuccess(captchaURL))
}

export const logout = (): ThunkType => async (dispatch) => {
  const data = await authAPI.logout()
  if (data.resultCode === 0) {
    dispatch(setAuthUsersData(null, null, null, false))
  }
}

export default authReducer
