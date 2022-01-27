import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';

import Sidebar from '../components/myaccount/Sidebar';
import Overview from '../components/myaccount/Overview';

function MyAccount({ walletAddress, stakeWheelBlockchain }) {
  const [currentTab, setCurrentTab] = useState("Overview");

  let content;

  switch (currentTab) {
    case "Overview":
      content = <Overview
        walletAddress={walletAddress}
        stakeWheelBlockchain={stakeWheelBlockchain} />;
      break;
    case "Winnings":
      content = <h1>Winnings</h1>;
      break;
    case "Donations":
      content = <h1>Donations</h1>;
      break;
    default:
      content = 'Page not found';
  }

  return <div>
    <Layout>
      <Layout.Sider
        width={210}
        className="white-bg-color"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      > 
        <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </Layout.Sider>
      <Layout className="white-bg-color" style={{ padding: '0 24px 24px', minHeight: '92vh' }}>
        <Layout.Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {content}
        </Layout.Content>
      </Layout>
    </Layout>
  </div>;
}

export default MyAccount;
