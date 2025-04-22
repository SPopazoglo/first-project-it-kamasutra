import { stopSubmit } from 'redux-form'
import { authAPI, securityAPI } from '../api/api'

const SET_USERS_DATA = 'samurai-network/auth/SET_USERS_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS'

let initialState = {
  id: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
  captchaURL: null,
}

const authReducer = (state = initialState, action) => {
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

export const setAuthUsersData = (id, email, login, isAuth) => ({
  type: SET_USERS_DATA,
  payload: { id, email, login, isAuth },
})
export const getCaptchaUrlSuccess = (captchaURL) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaURL },
})

export const getAuthUserData = () => async (dispatch) => {
  const data = await authAPI.me()
  if (data.resultCode === 0) {
    let { id, login, email } = data.data
    dispatch(setAuthUsersData(id, email, login, true))
  }
}

export const login =
  (email, password, rememberMe, captcha) => async (dispatch) => {
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

export const getCaptchaURL = () => async (dispatch) => {
  const data = await securityAPI.getCaptchaURL()
  const captchaURL = data.url
  dispatch(getCaptchaUrlSuccess(captchaURL))
}

export const logout = () => async (dispatch) => {
  const data = await authAPI.logout()
  if (data.resultCode === 0) {
    dispatch(setAuthUsersData(null, null, null, false))
  }
}

export default authReducer
