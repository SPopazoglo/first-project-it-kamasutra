import React from 'react'
import { connect } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import Profile from './Profile'
import { getUserProfile } from '../../redux/profileReducer'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams()
  // etc... other react-router-dom v6 hooks
  return (
    <WrappedComponent
      {...props}
      params={params}
      // etc...
    />
  )
}

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.params.userId
    if (!userId) {
      userId = 2
    }
    this.props.getUserProfile(userId)
  }

  render() {
    return <Profile {...this.props} profile={this.props.profile} />
  }
}

let AuthRedirectComponent = withAuthRedirect(ProfileContainer)

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
})

let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)

export default connect(mapStateToProps, { getUserProfile })(
  WithUrlDataContainerComponent
)
