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
  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>
        <DialogItem name="Bob" id="1" />
        <DialogItem name="Petro" id="2" />
        <DialogItem name="Ivan" id="3" />
        <DialogItem name="Vova" id="4" />
        <DialogItem name="Bella" id="5" />
      </div>
      <div className={styles.messages}>
        <Message message="Hi!" />
        <Message message="How is your it-kamasutra?" />
        <Message message="Yo" />
      </div>
    </div>
  )
}

export default Dialogs
