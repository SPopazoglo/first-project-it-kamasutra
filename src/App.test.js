import React from 'react'
import ReactDOM from 'react-dom'
import { render, screen } from '@testing-library/react'
import SamuraiJSApp from './App'

test('render without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<SamuraiJSApp />, div)
  ReactDOM.unmountComponentAtNode(div)
})
