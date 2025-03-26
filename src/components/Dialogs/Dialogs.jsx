import React from 'react'
import { Navigate } from 'react-router-dom'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import styles from './Dialogs.module.css'
import { Field, reduxForm } from 'redux-form'
import { Textarea } from '../common/FormsControls/FormsControls'
import { maxLengthCreator, required } from '../../utils/validators/validators'

const Dialogs = (props) => {
  let state = props.dialogsPage

  let dialogsElements = state.dialogsData.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} key={dialog.id} />
  ))

  let messagesElements = state.messagesData.map((letter) => (
    <Message message={letter.message} key={letter.id} />
  ))

  let addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody)
  }

  if (!props.isAuth) {
    return <Navigate to="/login" />
  }

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>{dialogsElements}</div>
      <div className={styles.messages}>
        <div>{messagesElements}</div>
        <AddMessageFormRedux onSubmit={addNewMessage} />
      </div>
    </div>
  )
}

const maxLength30 = maxLengthCreator(30)

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          validate={[required, maxLength30]}
          placeholder="Enter your message"
          name="newMessageBody"
        />
      </div>
      <div>
        <button>send</button>
      </div>
    </form>
  )
}

const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(
  AddMessageForm
)

export default Dialogs
