import React from 'react'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import styles from './Dialogs.module.css'

const Dialogs = (props) => {
  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>
        {props.state.dialogsData.map((dialog) => (
          <DialogItem name={dialog.name} id={dialog.id} />
        ))}
      </div>
      <div className={styles.messages}>
        {props.state.messagesData.map((letter) => (
          <Message message={letter.message} />
        ))}
      </div>
    </div>
  )
}

export default Dialogs
