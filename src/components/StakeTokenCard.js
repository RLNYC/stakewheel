import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Statistic, Button } from 'antd';

function StakeTokenCard({ walletAddress, stakeTokenBalance, stakeWheelBlockchain }) {
  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    if(stakeWheelBlockchain) getNFTs();
  }, [stakeWheelBlockchain]);

  const getDate = (dateTimeStamp) => {
    const date = new Date(dateTimeStamp * 1000); // x1000 to convert from seconds to milliseconds 
    let stringDate = date.toUTCString();
    stringDate = stringDate.substring(0, stringDate.indexOf("GMT")) + "UTC";
    return stringDate;
  }
  
  const getNFTs = async () => {
    const totalSupply = await stakeWheelBlockchain.totalSupply();
    let oldnfts = [];

    for(let i = 1; i <= totalSupply; i++){
      const tokenOwner = await stakeWheelBlockchain.ownerOf(i);
      
      if(tokenOwner === walletAddress){
        let data = await stakeWheelBlockchain.stakelist(i);
        console.log(data);
        oldnfts.push(data);
      }
    }

    setNFTs(oldnfts);
  }

  return (
    <Card>
      <Typography.Title style={{ marginTop: '0', marginBottom: '.5rem'}}>
        Stake Token Status
      </Typography.Title>
      <Statistic title="Stake Tokens" value={`${stakeTokenBalance / 10 ** 18}`} />
     
      <Row gutter={16}>
        {nfts.map(nft => (
          <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 8 }}>
            <Card>
              <h2>NFT Id: {nft.nftid.toString()}</h2>
              <p>Stake Amount: {nft.stakeAmount.toString() / 10 ** 18} AVAX</p>
              <p>Start Date: {getDate(nft.startDate.toString())}</p>
              <p>Claim Date: {getDate(+nft.startDate.toString() + 17543)}</p>
              <Button type="primary">
                Claim Ticket Tokens
              </Button>
              <br />
              <Button type="danger">
                Unstake and Burn NFT
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  )
}

export default StakeTokenCard;
