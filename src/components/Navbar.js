import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button } from 'antd';

function Navbar({ walletAddress }) {
  return (
    <Layout.Header>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Link to="/" style={{ color: 'white'}}>
          Stake Wheel
        </Link>
        <div>
          {!walletAddress
            ? <div>
                <Button
                  style={{ marginBottom: '7px'}}
                  type="primary"
                >
                  Connect to Wallet
                </Button>
              </div>
            : <Button
                style={{ marginBottom: '7px'}}
                type="primary"
              >
                { walletAddress.substring(0, 7) + '...' + walletAddress.substring(35, 42) }
              </Button>
          }
        </div>
      </div>
     
    </Layout.Header>
  )
}

export default Navbar;
