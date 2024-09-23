import Header from './components/header/Header'
import Navbar from './components/navbar/Navbar'
import Profile from './components/profile/Profile'
import Dialogs from './components/Dialogs/Dialogs'
import './App.css'

function App() {
  return (
    <div className="App app-wrapper">
      <Header />
      <Navbar />
      <div className="app-wrapper-content">
        <Dialogs />
      </div>
      {/* <Profile /> */}
    </div>
  )
}

export default App
