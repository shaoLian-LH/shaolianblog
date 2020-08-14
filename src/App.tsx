import React, { FC } from 'react';
import { isPC } from '@U/pcOrPhoneUtil';
import Table from '@C/Table';
import { HashRouter, Route } from 'react-router-dom';
import RouterConfig from '@/config/RouterConfig';
import './App.scss';

const App: FC = () => {
  let isPCNow = isPC();
  
  return (
    <div className = "app-main-div">
        {/* PC界面刷新出Table相关UI */}
        {
          isPCNow ? <Table /> : ''
        }
        <HashRouter basename = "/blog">
          {
            RouterConfig.map((item, index) => {
              return (
                <Route 
                  key = { `route-${index}` } 
                  path = { item.path } 
                  exact = { item.exact } 
                  component = { item.component } 
                />
              )
            })
          }
        </HashRouter>
    </div>
  );
}

export default App;
