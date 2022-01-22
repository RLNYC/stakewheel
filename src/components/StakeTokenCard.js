import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Statistic } from 'antd';

function StakeTokenCard({ walletAddress, stakeTokenBalance, stakeWheelBlockchain }) {
  const [date, setDate] = useState("");

  useEffect(() => {
    if(stakeWheelBlockchain) getNFTs();
  }, [stakeWheelBlockchain]);
  
  const getNFTs = async () => {
    const totalSupply = await stakeWheelBlockchain.totalSupply();

    for(let i = 1; i <= totalSupply; i++){
      const tokenOwner = await stakeWheelBlockchain.ownerOf(i);
      
      if(tokenOwner === walletAddress){
        let data = await stakeWheelBlockchain.stakelist(i);
        console.log(data);
        setDate(data.startDate.toString());
      }
    }
  }
  return (
    <Card>
      <Typography.Title style={{ marginTop: '0', marginBottom: '.5rem'}}>
        Stake Token Status
      </Typography.Title>
      <Row gutter={16}>
        <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 8 }}>
          <Statistic title="Stake Tokens" value={`${stakeTokenBalance / 10 ** 18}`} />
          <p>Start Date: {date}</p>
          <p>Claim Date: {+date + 17543}</p>
        </Col>
      </Row>
    </Card>
  )
}

export default StakeTokenCard;
