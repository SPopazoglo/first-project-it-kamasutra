import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import { createField, Textarea } from '../common/FormsControls/FormsControls'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import { InitialStateType } from '../../redux/dialogsReducer'
import styles from './Dialogs.module.css'

type OwnPropsType = {
  dialogsPage: InitialStateType
  sendMessage: (messageText: string) => void
}
export type NewMessageFormValuesType = {
  newMessageBody: string
}
type NewMessageFormValuesKeysType = Extract<
  keyof NewMessageFormValuesType,
  string
>

const Dialogs: React.FC<OwnPropsType> = (props) => {
  let state = props.dialogsPage

  let dialogsElements = state.dialogsData.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} key={dialog.id} />
  ))

  let messagesElements = state.messagesData.map((letter) => (
    <Message message={letter.message} key={letter.id} />
  ))

  let addNewMessage = (values: NewMessageFormValuesType) => {
    props.sendMessage(values.newMessageBody)
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

type PropsType = {}

const AddMessageForm: React.FC<
  InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType
> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<NewMessageFormValuesKeysType>(
          'Enter your message',
          'newMessageBody',
          Textarea,
          [required, maxLength30]
        )}
      </div>
      <div>
        <button>send</button>
      </div>
    </form>
  )
}

const AddMessageFormRedux = reduxForm<NewMessageFormValuesType, PropsType>({
  form: 'dialogAddMessageForm',
})(AddMessageForm)

export default Dialogs
