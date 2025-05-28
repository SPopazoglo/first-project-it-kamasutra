import { FormAction, stopSubmit } from 'redux-form'
import { ResultCodeForCaptcha, ResultCodesEnum } from '../api/api'
import { authAPI } from '../api/auth-api'
import { securityAPI } from '../api/security-api'
import { BaseThunkType, InferActionsTypes } from './reduxStore'

const initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isFetching: false,
  isAuth: false,
  captchaURL: null as string | null,
}

const authReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'SN/auth/SET_USERS_DATA':
    case 'SN/auth/GET_CAPTCHA_URL_SUCCESS':
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}

export const actions = {
  setAuthUsersData: (
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: 'SN/auth/SET_USERS_DATA',
      payload: { id, email, login, isAuth },
    } as const),
  getCaptchaUrlSuccess: (captchaURL: string) =>
    ({
      type: 'SN/auth/GET_CAPTCHA_URL_SUCCESS',
      payload: { captchaURL },
    } as const),
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  const meData = await authAPI.me()
  if (meData.resultCode === ResultCodesEnum.Success) {
    let { id, login, email } = meData.data
    dispatch(actions.setAuthUsersData(id, email, login, true))
  }
}

export const login =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
  ): ThunkType =>
  async (dispatch) => {
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
  dispatch(actions.getCaptchaUrlSuccess(captchaURL))
}

export const logout = (): ThunkType => async (dispatch) => {
  const data = await authAPI.logout()
  if (data.resultCode === 0) {
    dispatch(actions.setAuthUsersData(null, null, null, false))
  }
}

export default authReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
