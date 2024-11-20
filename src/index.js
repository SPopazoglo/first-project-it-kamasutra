import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import store from './redux/state'
import './index.css'

let rerenderEntireTree = (state) => {
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(
    <BrowserRouter>
      <App state={state} dispatch={store.dispatch.bind(store)} store={store} />
    </BrowserRouter>
  )
}

rerenderEntireTree(store.getState())

store.subscribe(rerenderEntireTree)
