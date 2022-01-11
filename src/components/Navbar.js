import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button } from 'antd';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import { STAKE_WHEEL_ADDRESS, TICKET_TOKEN_ADDRESS } from '../config';
import StakeWheel from '../artifacts/contracts/StakeWheel.sol/StakeWheel.json';
import TicketToken from '../artifacts/contracts/TicketToken.sol/TicketToken.json';

function Navbar({ walletAddress, setWalletAddress, setAvaxBalance, setStakeWheelBlockchain, setTicketTokenBlockchain }) {
  const connetToWallet = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);  
    console.log(provider);

    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setWalletAddress(address);

    const balance = await provider.getBalance(address);
    setAvaxBalance(balance.toString());

    let contract = new ethers.Contract(STAKE_WHEEL_ADDRESS, StakeWheel.abi, signer);
    setStakeWheelBlockchain(contract);

    let contract2 = new ethers.Contract(TICKET_TOKEN_ADDRESS, TicketToken.abi, signer);
    setTicketTokenBlockchain(contract2);
  }

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
                  onClick={connetToWallet}
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
