import React, { Suspense, lazy } from 'react'
import { connect, Provider } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import { UsersContainer } from './components/Users/UsersContainer'
import { Header } from './components/header/Header'
import { Login } from './components/login/Login'
import { initializeApp } from './redux/appReducer'
import Preloader from './components/common/preloader/Preloader'
import NotFound from './components/common/NotFound/NotFound'
import store, { AppStateType } from './redux/reduxStore'
import './App.css'
import {
  LaptopOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
const ProfileContainer = lazy(
  () => import('./components/profile/ProfileContainer')
)
const DialogsContainer = lazy(
  () => import('./components/Dialogs/DialogsContainer')
)
const ChatPage = lazy(() => import('./pages/Chat/ChatPage'))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

const { Content, Footer, Sider } = Layout

export type MenuItem = Required<MenuProps>['items'][number]

export function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}
const itemsSideMenu: MenuItem[] = [
  getItem('My Profile', 'MyProfile', <UserOutlined />, [
    getItem(<Link to="profile">Profile</Link>, 'Profile'),
    getItem(<Link to="dialogs">Messages</Link>, 'Messages'),
    getItem(<Link to="news">News</Link>, 'News'),
    getItem(<Link to="music">Music</Link>, 'Music'),
  ]),

  getItem('Developers', 'Developers', <LaptopOutlined />, [
    getItem(<Link to="users">Users</Link>, 'Users'),
    getItem(<Link to="chat">Chat</Link>, 'Chat'),
  ]),

  getItem('Settings1', 'Settings1', <SettingOutlined />, [
    getItem(<Link to="settings">Settings</Link>, 'Settings'),
  ]),
]

class App extends React.Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <Layout>
        <Header />
        <div style={{ padding: '0 48px' }}>
          <Layout
            style={{
              padding: '24px 0',
              background: 'white',
              borderRadius: '15px',
            }}
          >
            <Sider style={{ background: 'white' }} width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
                items={itemsSideMenu}
              />
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Suspense fallback={<Preloader />}>
                <Routes>
                  <Route path="/" element={<Navigate to="profile" />} />
                  <Route
                    path="profile/:userId?"
                    element={<ProfileContainer />}
                  />
                  <Route path="dialogs" element={<DialogsContainer />} />
                  <Route path="news" element={<News />} />
                  <Route path="music" element={<Music />} />
                  <Route path="settings" element={<Settings />} />
                  <Route
                    path="users"
                    element={
                      <UsersContainer pageTitle="страница пользователей" />
                    }
                  />
                  <Route path="login" element={<Login />} />
                  <Route path="chat" element={<ChatPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </Content>
          </Layout>
        </div>
        <Footer style={{ textAlign: 'center' }}>
          Samurai Social Network ©{new Date().getFullYear()} Created by Sergei
        </Footer>
      </Layout>
      // <div className="App app-wrapper">
      //   <HeaderContainer />
      //   <Navbar />
      //   <div className="app-wrapper-content">
      //     <Suspense fallback={<Preloader />}>
      //       <Routes>
      //         <Route path="/" element={<Navigate to="profile" />} />
      //         <Route path="profile/:userId?" element={<ProfileContainer />} />
      //         <Route path="dialogs" element={<DialogsContainer />} />
      //         <Route path="news" element={<News />} />
      //         <Route path="music" element={<Music />} />
      //         <Route path="settings" element={<Settings />} />
      //         <Route
      //           path="users"
      //           element={<UsersContainer pageTitle="страница пользователей" />}
      //         />
      //         <Route path="login" element={<Login />} />
      //         <Route path="*" element={<NotFound />} />
      //       </Routes>
      //     </Suspense>
      //   </div>
      // </div>
    )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
})

const AppContainer = connect(mapStateToProps, { initializeApp })(App)

const SamuraiJSApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
}

export default SamuraiJSApp
