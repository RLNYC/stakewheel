import React, { useEffect, useState } from 'react';
import { Card, Typography, Statistic, Button, Select } from 'antd';

function Faucet({ walletAddress, avaxBalance, stakeWheelBlockchain, stakeTokenBlockchain, ticketTokenBlockchain }) {
  const [ticketTokenBalance, setTicketTokenBalance] = useState(0);
  const [stakeTokenBalance, setStakeTokenBalance] = useState(0);
  
  useEffect(() => {
    if(ticketTokenBlockchain) getTicketTokenBalance();
  }, [ticketTokenBlockchain])

  useEffect(() => {
    if(stakeTokenBlockchain) getStakeTokenBalance();
  }, [stakeTokenBlockchain])

  const getTicketTokenBalance = async () => {
    const amount = await ticketTokenBlockchain.balanceOf(walletAddress);
    setTicketTokenBalance(amount);
  }

  const getStakeTokenBalance = async () => {
    const amount = await stakeTokenBlockchain.balanceOf(walletAddress);
    setStakeTokenBalance(amount);
  }


  const stakeFaucet = async () => {
    try{
      const transaction = await stakeWheelBlockchain.stakeTokenFaucet();
      const tx = await transaction.wait();
      console.log(tx);
      getStakeTokenBalance();
    } catch(error) {
      console.error(error);
    }
  }

  const ticketFaucet = async () => {
    try{
      const transaction = await stakeWheelBlockchain.ticketTokenFaucet();
      const tx = await transaction.wait();
      console.log(tx);
      getTicketTokenBalance();
    } catch(error) {
      console.error(error);
    }
  }

  return <div>
    <Card>
      <Typography.Title style={{ marginTop: '0', marginBottom: '.5rem'}}>
        Faucet
      </Typography.Title>
      <Statistic title="Stake Tokens" value={`${stakeTokenBalance / 10 ** 18}`} />
      <Button onClick={stakeFaucet} type="primary">
        Get 10 Stake Faucet
      </Button>

      <br />
      <br />

      <Statistic title="Tickets Tokens" value={`${ticketTokenBalance / 10 ** 18}`} />
      <Button onClick={ticketFaucet} type="primary">
        Get 10 Ticket Faucet
      </Button>
    </Card>
  </div>;
}

export default Faucet;
