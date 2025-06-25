import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './../Dialogs.module.css'

type PropsType = {
  id: number
  name: string
}

const DialogItem = (props: PropsType) => {
  let path = '/dialogs/' + props.id

  return (
    <div className={styles.dialog + ' ' + styles.active}>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  )
}

export default DialogItem
