import React, { FC, useEffect } from 'react';
import Table from '@C/Table';
import { HashRouter as HRouter, Route, Switch } from 'react-router-dom';
import RouterConfig from '@/config/RouterConfig';
import NotFound from '@/page/404/NotFound';
import SecurityLayout from '@/layout/SecurityLayout';
import './App.scss';
import { useMatomo } from '@datapunt/matomo-tracker-react'

const App: FC = () => {
  const { trackPageView } = useMatomo()
  
  useEffect(() => {
    trackPageView({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className = "app-main-div">
        <Table />
        <HRouter>
          <SecurityLayout>
            <Switch>
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
              <Route  component = { NotFound }/>
            </Switch>
          </SecurityLayout>
        </HRouter>
    </div>
  );
}

export default App;
