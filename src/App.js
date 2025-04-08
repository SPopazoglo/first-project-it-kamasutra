import React from 'react'
import { connect, Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import ProfileContainer from './components/profile/ProfileContainer'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import UsersContainer from './components/Users/UsersContainer'
import HeaderContainer from './components/header/HeaderContainer'
import Login from './components/login/Login'
import { initializeApp } from './redux/appReducer'
import Preloader from './components/common/preloader/Preloader'
import './App.css'
import store from './redux/reduxStore'

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <div className="App app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Routes>
            <Route path="profile/:userId?" element={<ProfileContainer />} />
            <Route path="dialogs" element={<DialogsContainer />} />
            <Route path="news" element={<News />} />
            <Route path="music" element={<Music />} />
            <Route path="settings" element={<Settings />} />
            <Route path="users" element={<UsersContainer />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
})

let AppContainer = connect(mapStateToProps, { initializeApp })(App)

const SamuraiJSApp = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
}

export default SamuraiJSApp
