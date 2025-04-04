import { stopSubmit } from 'redux-form'
import { authAPI } from '../api/api'

const SET_USERS_DATA = 'samurai-network/auth/SET_USERS_DATA'

let initialState = {
  id: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS_DATA:
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

export const getAuthUserData = () => async (dispatch) => {
  const data = await authAPI.me()
  if (data.resultCode === 0) {
    let { id, login, email } = data.data
    dispatch(setAuthUsersData(id, email, login, true))
  }
}

export const login = (email, password, rememberMe) => async (dispatch) => {
  const data = await authAPI.login(email, password, rememberMe)
  if (data.resultCode === 0) {
    dispatch(getAuthUserData())
  } else {
    let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
    dispatch(stopSubmit('login', { _error: message }))
  }
}

export const logout = () => async (dispatch) => {
  const data = await authAPI.logout()
  if (data.resultCode === 0) {
    dispatch(setAuthUsersData(null, null, null, false))
  }
}

export default authReducer
