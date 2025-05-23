import { ThunkAction } from 'redux-thunk'
import { getAuthUserData } from './authReducer'
import { AppStateType } from './reduxStore'

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

export type InitialStateType = {
  initialized: boolean
}

const initialState: InitialStateType = {
  initialized: false,
}

type ActionsTypes = InitializedSuccessActionType

const appReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
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

type InitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({
  type: INITIALIZED_SUCCESS,
})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const initializeApp = () => (dispatch: any) => {
  let dispatchResultPromise = dispatch(getAuthUserData())
  dispatchResultPromise.then(() => {
    dispatch(initializedSuccess())
  })
}

export default appReducer
