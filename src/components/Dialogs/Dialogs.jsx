import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Dialogs.module.css'

const Dialogs = (props) => {
  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>
        <div className={styles.dialog + ' ' + styles.active}>
          <NavLink to="/dialogs/1">Bob</NavLink>
        </div>
        <div className={styles.dialog}>
          <NavLink to="/dialogs/2">Petro</NavLink>
        </div>
        <div className={styles.dialog}>
          <NavLink to="/dialogs/3">Ivan</NavLink>
        </div>
        <div className={styles.dialog}>
          <NavLink to="/dialogs/4">Vova</NavLink>
        </div>
        <div className={styles.dialog}>
          <NavLink to="/dialogs/5">Bella</NavLink>
        </div>
      </div>
      <div className={styles.messages}>
        <div className={styles.message}>Hi!</div>
        <div className={styles.message}>How are you?</div>
        <div className={styles.message}>What do you do?</div>
      </div>
    </div>
  )
}

export default Dialogs
