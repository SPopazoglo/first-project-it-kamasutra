import { stopSubmit } from 'redux-form'
import { authAPI, securityAPI } from '../api/api'

const SET_USERS_DATA = 'samurai-network/auth/SET_USERS_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS'

// export type InitialStateType = {
//   id: number | null
//   email: string | null
//   login: string | null
//   isFetching: boolean
//   isAuth: boolean
//   captchaURL: string | null
// }

const initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isFetching: false,
  isAuth: false,
  captchaURL: null as string | null,
}

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
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

export const getAuthUserData = () => async (dispatch: any) => {
  const data = await authAPI.me()
  if (data.resultCode === 0) {
    let { id, login, email } = data.data
    dispatch(setAuthUsersData(id, email, login, true))
  }
}

export const login =
  (email: string, password: string, rememberMe: boolean, captcha: any) =>
  async (dispatch: any) => {
    const data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === 0) {
      dispatch(getAuthUserData())
    } else {
      if (data.resultCode === 10) {
        dispatch(getCaptchaURL())
      }
      let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
      dispatch(stopSubmit('login', { _error: message }))
    }
  }

export const getCaptchaURL = () => async (dispatch: any) => {
  const data = await securityAPI.getCaptchaURL()
  const captchaURL = data.url
  dispatch(getCaptchaUrlSuccess(captchaURL))
}

export const logout = () => async (dispatch: any) => {
  const data = await authAPI.logout()
  if (data.resultCode === 0) {
    dispatch(setAuthUsersData(null, null, null, false))
  }
}

export default authReducer
