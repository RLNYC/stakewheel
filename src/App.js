import React, { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

import './App.css';
import Navbar from './components/Navbar';
import Stake from './pages/Stake';
import SpinWheel from './pages/SpinWheel';
import Faucet from './pages/Faucet';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [ethProvider, setEthProvider] = useState(null);
  const [ticketTokenBlockchain, setTicketTokenBlockchain] = useState(null);
  const [stakeTokenBlockchain, setStakeTokenBlockchain] = useState(null);
  const [stakeWheelBlockchain, setStakeWheelBlockchain] = useState(null);

  return (
    <HashRouter>
      <Layout className="App">
        <Navbar
          walletAddress={walletAddress}
          setWalletAddress={setWalletAddress}
          setEthProvider={setEthProvider}
          setStakeWheelBlockchain={setStakeWheelBlockchain}
          setStakeTokenBlockchain={setStakeTokenBlockchain}
          setTicketTokenBlockchain={setTicketTokenBlockchain} />
        <Layout>
          <Layout style={{ padding: '0 5rem 5rem', minHeight: '92vh' }}>
            <Layout.Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Routes>
                <Route path="/stake" element={
                  <Stake
                    walletAddress={walletAddress}
                    stakeWheelBlockchain={stakeWheelBlockchain}
                    stakeTokenBlockchain={stakeTokenBlockchain}
                    ethProvider={ethProvider} />} >
                </Route>
                <Route path="/faucet" element={
                  <Faucet
                    walletAddress={walletAddress}
                    stakeWheelBlockchain={stakeWheelBlockchain}
                    stakeTokenBlockchain={stakeTokenBlockchain}
                    ticketTokenBlockchain={ticketTokenBlockchain} />} >
                </Route>
                <Route path="/" element={
                  <SpinWheel
                    walletAddress={walletAddress}
                    ethProvider={ethProvider}
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
