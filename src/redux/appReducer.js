import { getAuthUserData } from './authReducer'

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

let initialState = {
  initialized: false,
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      }

    default:
      return state
  }
}

export const initializedSuccess = () => ({
  type: INITIALIZED_SUCCESS,
})

export const initializeApp = () => (dispatch) => {
  let dispatchResultPromise = dispatch(getAuthUserData())
  dispatchResultPromise.then(() => {
    dispatch(initializedSuccess())
  })
}

export default appReducer
