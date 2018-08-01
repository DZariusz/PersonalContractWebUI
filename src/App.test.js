import React from 'react'
import ReactDOM from 'react-dom'
import DZariuszApp from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<DZariuszApp />, div)
})
