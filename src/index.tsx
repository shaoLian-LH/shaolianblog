import React from 'react';
import ReactDom from 'react-dom';
import './styles/index.scss';
import App from './App';
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'

const tarckBase = 'http://121.199.23.187:86'

const instance = createInstance({
  urlBase: tarckBase,
  siteId: 1,
  heartBeat: { // optional, enabled by default
    active: true, // optional, default value: true
    seconds: 10 // optional, default value: `15
  },
  configurations: { // optional, default value: {}
    // any valid matomo configuration, all below are optional
    setRequestMethod: 'POST'
  },
})
ReactDom.render(
  <MatomoProvider value={instance}>
    <App />
  </MatomoProvider>,
  document.getElementById('shaolian')
)