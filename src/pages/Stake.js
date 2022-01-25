import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Statistic, Button, Divider, InputNumber } from 'antd';
import { ethers } from 'ethers';

function Stake({ walletAddress, stakeWheelBlockchain, stakeTokenBlockchain, ethProvider }) {
  const [nfts, setNFTs] = useState([]);
  const [avaxBalance, setAvaxBalance] = useState(0);
  const [stakeTokenBalance, setStakeTokenBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [stakeLoading, setStakeLoading] = useState(false);

  useEffect(() => {
    if(stakeWheelBlockchain) getNFTs();
  }, [stakeWheelBlockchain]);

  useEffect(() => {
    if(stakeTokenBlockchain) getStakeToken();
  }, [stakeTokenBlockchain]);

  useEffect(() => {
    if(walletAddress) getBalance();
  }, [walletAddress]);
  
  const getStakeToken = async () => {
    const amount = await stakeTokenBlockchain.balanceOf(walletAddress);
    setStakeTokenBalance(amount);
  }

  const getBalance = async () => {
    const balance = await ethProvider.getBalance(walletAddress);
    setAvaxBalance(balance.toString());
  }

  const getDate = (dateTimeStamp) => {
    const date = new Date(dateTimeStamp * 1000); // x1000 to convert from seconds to milliseconds 
    let stringDate = date.toUTCString();
    stringDate = stringDate.substring(0, stringDate.indexOf("GMT")) + "UTC";
    return stringDate;
  }

  const onChange = (value) => {
    console.log(value);
    setAmount(value);
  }

  const getNFTs = async () => {
    const totalSupply = await stakeWheelBlockchain.totalSupply();
    let oldnfts = [];

    for(let i = 2; i <= +totalSupply + 1; i++){
      const tokenOwner = await stakeWheelBlockchain.ownerOf(i);
      
      if(tokenOwner === walletAddress){
        let data = await stakeWheelBlockchain.stakelist(i);
        console.log(data);
        oldnfts.push(data);
      }
    }

    setNFTs(oldnfts);
  }

  const stakeforTokens = async (values) => {
    try{
      setStakeLoading(true);
      console.log(values);

      const ethToWei = ethers.utils.parseUnits(amount.toString(), 'ether');
      const transaction = await stakeWheelBlockchain.stakeforTokens({ value: ethToWei });
      const tx = await transaction.wait();
      console.log(tx);
      setStakeLoading(false);
      getBalance();
    } catch(error) {
      console.error(error);
      setStakeLoading(false);
    }
  };

  const claimTicketTokens = async (nftId) => {
    try{
      const transaction = await stakeWheelBlockchain.claimTicketTokens(nftId);
      const tx = await transaction.wait();
      console.log(tx);
      //getTicketToken();
      getNFTs();
    } catch(error) {
      console.error(error);
    }
  }

  const unstakeAndBurnNFT = async (nftId) => {
    try{
      const transaction = await stakeWheelBlockchain.unstakeAndBurnNFT(nftId);
      const tx = await transaction.wait();
      console.log(tx);
      getNFTs();
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <Card>
      <Typography.Title style={{ marginTop: '0', marginBottom: '.5rem'}}>
        Stake
      </Typography.Title>
      <Typography.Title level={5}>
        For every Avax deposit into our staking pool, you receive the following EVERY WEEK:
      </Typography.Title>
      <ul>
        <li>2 spin tickets</li>
        <li>Donation tokens based on your share of the staking pool and our staking award earned</li>
      </ul>
      <Typography.Title level={5}>
        You can redeem all your deposit back during non lock-up period.
      </Typography.Title>

      {walletAddress && <div style={{ display: "flex", justifyContent: "center"}}>
        <Card title={`Your Wallet: ${walletAddress}`} bordered={false} style={{ width: 300 }}>
          <p>Available AVAX: {avaxBalance / 10 ** 18}</p>
          <p>Deposit Amount: <InputNumber max={avaxBalance / 10 ** 18} onChange={onChange} /></p>
          <Button type="primary" onClick={stakeforTokens} loading={stakeLoading}>
            Submit
          </Button>
        </Card>
      </div>}

      <Divider>NFTs</Divider>

      <Statistic title="Stake Tokens" value={`${stakeTokenBalance / 10 ** 18}`} />
     
      <Row gutter={16}>
        {nfts.map(nft => (
          <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 8 }} key={nft.nftid.toString()}>
            <Card>
              <h2>NFT Id: {nft.nftid.toString()}</h2>
              <p>Stake Amount: {nft.stakeAmount.toString() / 10 ** 18} AVAX</p>
              <p>Start Date: {getDate(nft.startDate.toString())}</p>
              <p>Claim Date: {getDate(+nft.startDate.toString() + 17543)}</p>
              <Button type="primary" onClick={() => claimTicketTokens(nft.nftid.toString())}>
                Claim Ticket Tokens
              </Button>
              <br />
              <Button type="danger" onClick={() => unstakeAndBurnNFT(nft.nftid.toString())}>
                Unstake and Burn NFT
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  )
}

export default Stake;
