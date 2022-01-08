import React, { useState } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SpinWheel from './pages/SpinWheel';

function App() {
  const [walletAddress, setWalletAddress] = useState('');

  return (
    <HashRouter>
      <Layout className="App">
        <Navbar />
        <Layout>
          <Layout.Sider
            width={180}
            className="site-layout-background"
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          > 
            <Sidebar />
          </Layout.Sider>
          <Layout style={{ padding: '0 24px 24px', minHeight: '92vh' }}>
            <Layout.Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Switch>
                <Route path="/">
                  <SpinWheel
                    walletAddress={walletAddress} />
                </Route>
              </Switch>
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    </HashRouter>
  );
}

export default App;
