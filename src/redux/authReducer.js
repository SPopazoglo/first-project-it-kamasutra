import { authAPI } from '../api/api'

const SET_USERS_DATA = 'SET_USERS_DATA'
const UNFOLLOW = 'UNFOLLOW'

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

export const getAuthUserData = () => (dispatch) => {
  return authAPI.me().then((data) => {
    if (data.resultCode === 0) {
      let { id, login, email } = data.data
      dispatch(setAuthUsersData(id, email, login, true))
    }
  })
}

export const login = (email, password, rememberMe) => (dispatch) => {
  return authAPI.login(email, password, rememberMe).then((data) => {
    if (data.resultCode === 0) {
      dispatch(getAuthUserData())
    }
  })
}

export const logout = () => (dispatch) => {
  return authAPI.logout().then((data) => {
    if (data.resultCode === 0) {
      dispatch(setAuthUsersData(null, null, null, false))
    }
  })
}

export default authReducer
