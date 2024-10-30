import state, { subscribe } from './redux/state'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { addPost, updateNewPostText } from './redux/state'
import './index.css'

let rerenderEntireTree = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(
    <BrowserRouter>
      <App
        state={state}
        addPost={addPost}
        updateNewPostText={updateNewPostText}
      />
    </BrowserRouter>
  )
}

rerenderEntireTree(state)

subscribe(rerenderEntireTree)
