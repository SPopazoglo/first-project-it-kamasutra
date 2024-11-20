import React from 'react'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import styles from './Dialogs.module.css'
import {
  sendMessageCreator,
  updateNewMessageBodyCreator,
} from '../../redux/state'

const Dialogs = (props) => {
  let state = props.store.getState().dialogsPage

  let dialogsElements = state.dialogsData.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} />
  ))

  let messagesElements = state.messagesData.map((letter) => (
    <Message message={letter.message} />
  ))
  let newMessageBody = state.newMessageBody

  let onSendMessageClick = () => {
    props.store.dispatch(sendMessageCreator())
  }

  let onNewMessageChange = (e) => {
    let body = e.target.value
    props.store.dispatch(updateNewMessageBodyCreator(body))
  }

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>{dialogsElements}</div>
      <div className={styles.messages}>
        <div>{messagesElements}</div>
        <div>
          <div>
            <textarea
              value={newMessageBody}
              onChange={onNewMessageChange}
              placeholder="Enter your message"
            ></textarea>
          </div>
          <div>
            <button onClick={onSendMessageClick}>send</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dialogs
