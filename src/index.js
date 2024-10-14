import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

const postsData = [
  { id: 1, message: 'Hi, how are you?', likesCount: 5 },
  { id: 2, message: "Hello! It's my first post", likesCount: 10 },
  { id: 2, message: 'blalba', likesCount: 3 },
  { id: 2, message: 'yess!!!', likesCount: 105 },
]

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

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <App
    postsData={postsData}
    dialogsData={dialogsData}
    messagesData={messagesData}
  />
)
