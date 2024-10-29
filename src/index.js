import state from './redux/state'
import { rerenderEntireTree } from './render'
import './index.css'

rerenderEntireTree(state)
