import React from 'react';
import ReactDom from 'react-dom';
import './styles/index.scss';
import App from './App';
import * as Sentry from '@sentry/browser';
Sentry.init({
  dsn: "https://1d8cd580f0064bb5945962cd645d1228@sentry.yuudachi.cn:444/3",
  environment: process.env.NODE_ENV,
  beforeBreadcrumb(breadcrumb: any) {
    if (breadcrumb.category === 'console') {
      return null
    }
    return breadcrumb
  },
});
ReactDom.render(
  <App />,
  document.getElementById('shaolian')
)