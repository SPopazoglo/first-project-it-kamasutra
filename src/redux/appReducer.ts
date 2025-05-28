import { ThunkAction } from 'redux-thunk'
import { getAuthUserData } from './authReducer'
import { AppStateType, BaseThunkType, InferActionsTypes } from './reduxStore'

const initialState = {
  initialized: false,
}

const appReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'SN/APP/INITIALIZED_SUCCESS':
      return {
        ...state,
        initialized: true,
      }

    default:
      return state
  }
}

export const actions = {
  initializedSuccess: () => ({ type: 'SN/APP/INITIALIZED_SUCCESS' } as const),
}

export const initializeApp = () => (dispatch: any) => {
  const dispatchResultPromise = dispatch(getAuthUserData())
  dispatchResultPromise.then(() => {
    dispatch(actions.initializedSuccess())
  })
}

export default appReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
