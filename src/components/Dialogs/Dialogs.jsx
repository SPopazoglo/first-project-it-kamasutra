import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Dialogs.module.css'

const DialogItem = (props) => {
  let path = '/dialogs/' + props.id

  return (
    <div className={styles.dialog + ' ' + styles.active}>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  )
}

const Message = (props) => {
  return <div className={styles.message}>{props.message}</div>
}

const Dialogs = (props) => {
  const dialogsData = [
    { id: 1, name: 'Bob' },
    { id: 2, name: 'Petro' },
    { id: 3, name: 'Ivan' },
    { id: 4, name: 'Vova' },
    { id: 5, name: 'Bella' },
  ]

  const messagesData = [
    { id: 1, message: 'Hi!' },
    { id: 2, message: 'How is your it-kamasutra?' },
    { id: 3, message: 'Yo' },
    { id: 4, message: 'Cocca Colla' },
    { id: 5, message: 'What do you do?' },
  ]

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>
        {dialogsData.map((dialog) => {
          return <DialogItem name={dialog.name} id={dialog.id} />
        })}
      </div>
      <div className={styles.messages}>
        {messagesData.map((letter) => {
          return <Message message={letter.message} />
        })}
      </div>
    </div>
  )
}

export default Dialogs
