import { connect } from 'react-redux'
import {
  sendMessageCreator,
  updateNewMessageBodyCreator,
} from '../../redux/dialogsReducer'
import Dialogs from './Dialogs'
import { Navigate } from 'react-router-dom'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNewMessageBody: (body) => {
      dispatch(updateNewMessageBodyCreator(body))
    },
    sendMessage: () => {
      dispatch(sendMessageCreator())
    },
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs)
