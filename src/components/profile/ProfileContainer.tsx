import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import Profile from './Profile'
import {
  getStatus,
  getUserProfile,
  savePhoto,
  saveProfile,
  updateStatus,
} from '../../redux/profileReducer'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { AppStateType } from '../../redux/reduxStore'
import { ProfileType } from '../../../types/types'

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void
  updateStatus: (status: string) => void
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}

type PathParamsType = {
  userId: string
}
type MyComponentProps = {
  params: {
    userId: string
  }
}
type PropsType = MapPropsType & DispatchPropsType & MyComponentProps

function withRouter<P>(WrappedComponent: React.ComponentType<P>) {
  return function ComponentWithRouterProp(props: Omit<P, 'params'>) {
    const params = useParams<PathParamsType>()

    return <WrappedComponent {...(props as P)} params={params} />
  }
}

class ProfileContainer extends React.Component<PropsType> {
  constructor(props: PropsType) {
    super(props)
  }

  refreshProfile = () => {
    let userId: number | null = +this.props.params.userId
    if (!userId) {
      userId = this.props.autorizedUserId
    }

    if (!userId) {
      console.error(
        "ID should exists in URI params or in state ('authorizedUserId')"
      )
    } else {
      this.props.getUserProfile(userId)
      this.props.getStatus(userId)
    }
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps: PropsType) {
    if (this.props.params.userId != prevProps.params.userId) {
      this.refreshProfile()
    }
  }
  componentWillUnmount(): void {}

  render() {
    return (
      <Profile
        {...this.props}
        isOwner={!this.props.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}
        saveProfile={this.props.saveProfile}
      />
    )
  }
}

let mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  autorizedUserId: state.auth.id,
  isAuth: state.auth.isAuth,
})

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer)
