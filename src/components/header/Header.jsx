import React from 'react'
import styles from './Header.module.css'
import { NavLink } from 'react-router-dom'

function Header(props) {
  return (
    <header className={styles.header}>
      <img src="https://thumbs.dreamstime.com/b/fresh-grass-meadow-tree-15424454.jpg" />
      <div className={styles.loginBlock}>
        {props.isAuth ? props.login : <NavLink to="/login">Login</NavLink>}
      </div>
    </header>
  )
}

export default Header
