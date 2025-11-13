import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Avatar, Button, Layout, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { getItem, MenuItem } from '../../App'
import { AppDispatch } from '../../redux/reduxStore'
import { logout } from '../../redux/authReducer'
import { selectIsAuth, selectCurrentUserLogin } from '../../redux/authSelectors'
import styles from './Header.module.css'

const itemsHeaderMenu: MenuItem[] = [
  getItem(<Link to="profile">Profile</Link>, 'Profile'),
  getItem(<Link to="users">Users</Link>, 'Users'),
]

export const Header: React.FC = (props) => {
  const isAuth = useSelector(selectIsAuth)
  const login = useSelector(selectCurrentUserLogin)
  const dispatch: AppDispatch = useDispatch()
  const logoutCallback = () => {
    dispatch(logout())
  }

  const { Header } = Layout
  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        items={itemsHeaderMenu}
        style={{ flex: 1, minWidth: 0 }}
      />

      {isAuth ? (
        <div>
          <Avatar
            style={{ backgroundColor: '#87d068' }}
            icon={<UserOutlined />}
          />
          {login} <Button onClick={logoutCallback}>Log out</Button>
        </div>
      ) : (
        <Button>
          <Link to="/login">Login</Link>
        </Button>
      )}
    </Header>
  )
}
