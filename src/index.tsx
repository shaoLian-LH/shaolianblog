import React from 'react';
import ReactDom from 'react-dom';
import './styles/index.scss';
import App from './App';
import pkg from '../package.json'

let userId = Number(localStorage.getItem('userId'))
if (!userId) {
  userId = Math.floor(Math.random() * 9999999)
  localStorage.setItem('userId', String(userId))
}

window.localStorage.wmUserInfo = JSON.stringify({ 
  userId, 
  userTag: '游客', 
  projectVersion: pkg.version
})

ReactDom.render(
  <App />,
  document.getElementById('shaolian')
)