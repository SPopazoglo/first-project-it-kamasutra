import React, { JSX } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { AppStateType } from '../redux/reduxStore'

const mapStateToPropsForRedirect = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
})

type MapStatePropsType = ReturnType<typeof mapStateToPropsForRedirect>

type DispatchPropsType = {}

export function withAuthRedirect<WCP extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<WCP>
) {
  const RedirectComponent: React.FC<MapStatePropsType & DispatchPropsType> = (
    props
  ) => {
    let { isAuth, ...restProps } = props

    if (!isAuth) return <Navigate to="/login" />

    return <WrappedComponent {...(restProps as WCP)} />
  }

  let ConnectedAuthRedirectComponent = connect<
    MapStatePropsType,
    DispatchPropsType,
    WCP,
    AppStateType
  >(
    mapStateToPropsForRedirect,
    {}
  )(RedirectComponent)

  return ConnectedAuthRedirectComponent
}
