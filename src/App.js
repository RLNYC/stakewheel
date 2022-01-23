import React, { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SpinWheel from './pages/SpinWheel';
import Faucet from './pages/Faucet';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [avaxBalance, setAvaxBalance] = useState(0);
  const [ticketTokenBlockchain, setTicketTokenBlockchain] = useState(null);
  const [stakeTokenBlockchain, setStakeTokenBlockchain] = useState(null);
  const [stakeWheelBlockchain, setStakeWheelBlockchain] = useState(null);

  return (
    <HashRouter>
      <Layout className="App">
        <Navbar
          walletAddress={walletAddress}
          setWalletAddress={setWalletAddress}
          setAvaxBalance={setAvaxBalance}
          setStakeWheelBlockchain={setStakeWheelBlockchain}
          setStakeTokenBlockchain={setStakeTokenBlockchain}
          setTicketTokenBlockchain={setTicketTokenBlockchain} />
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
              <Routes>
                <Route path="/faucet" element={
                  <Faucet
                    walletAddress={walletAddress}
                    avaxBalance={avaxBalance}
                    stakeWheelBlockchain={stakeWheelBlockchain}
                    stakeTokenBlockchain={stakeTokenBlockchain}
                    ticketTokenBlockchain={ticketTokenBlockchain} />} >
                </Route>
                <Route path="/" element={
                  <SpinWheel
                    walletAddress={walletAddress}
                    avaxBalance={avaxBalance}
                    stakeWheelBlockchain={stakeWheelBlockchain}
                    stakeTokenBlockchain={stakeTokenBlockchain}
                    ticketTokenBlockchain={ticketTokenBlockchain} />} >
                </Route>
              </Routes>
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    </HashRouter>
  );
}

export default App;
