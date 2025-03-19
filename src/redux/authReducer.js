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
        ...action.data,
        isAuth: true,
      }

    default:
      return state
  }
}

export const setAuthUsersData = (id, email, login) => ({
  type: SET_USERS_DATA,
  data: { id, email, login },
})

export const getAuthUserData = () => (dispatch) => {
  return authAPI.me().then((data) => {
    if (data.resultCode === 0) {
      let { id, login, email } = data.data
      dispatch(setAuthUsersData(id, email, login))
    }
  })
}

export default authReducer
