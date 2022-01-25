import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Divider, List, Card } from 'antd';

import PrizePoolCard from '../components/PrizePoolCard';
import DonationFormCard from '../components/DonationFormCard';
import Wheel from '../components/Wheel';
import PrizeInformationCard from '../components/PrizeInformationCard';
import ResultModal from '../components/ResultModal';

function SpinWheel({ walletAddress, ethProvider, stakeWheelBlockchain, stakeTokenBlockchain, ticketTokenBlockchain, getStakeToken }) {
  const [wheelclass, setWheelclass] = useState("box");
  const [avaxBalance, setAvaxBalance] = useState(0);
  const [oneToUSDBalance, setOneToUSDBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [donationTotal, setDonationTotal] = useState(0);
  const [poolPrize, setPoolPrize] = useState(0);
  const [awardedWon, setAwardedWon] = useState(0);
  const [wonOne, setWonOne] = useState(0);
  const [usedTickets, setUsedTickets] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(stakeWheelBlockchain){
      getPoolPrizeInfo();
      getBalance();
    }
  }, [stakeWheelBlockchain])

  useEffect(() => {
    if(ticketTokenBlockchain) getTicketToken();
  }, [ticketTokenBlockchain])

  useEffect(() => {
    if(stakeTokenBlockchain) getStakeToken();
  }, [stakeTokenBlockchain])

  const getPoolPrizeInfo = async () => {
    const donation = await stakeWheelBlockchain.totalDonation();
    setDonationTotal(donation);

    const prize = await stakeWheelBlockchain.prizePool();
    setPoolPrize(prize);

    const award = await stakeWheelBlockchain.prizePoolWon();
    setAwardedWon(award);
  }

  const getBalance = async () => {
    const balance = await ethProvider.getBalance(walletAddress);
    setAvaxBalance(balance.toString());
  }

  const getTicketToken = async () => {
    const amount = await ticketTokenBlockchain.balanceOf(walletAddress);
    setTokenBalance(amount);
  }

  const startRotation = (wheelNumber) => {
    setWheelclass("box start-rotate");
    setTimeout(async () => {
      setWheelclass("box start-rotate stop-rotate");
      setIsModalVisible(true);
    }, (1000 + (125 * +wheelNumber)))
  }

  const earnToken = async () => {
    try{
      setLoading(true);
      const transaction = await stakeWheelBlockchain.useTicketToken();
      const tx = await transaction.wait();
      console.log(tx);
      setUsedTickets(usedTickets + 1);
      setWonOne(tx.events[1].args.amount.toString());
      setResult(tx.events[1].args.result);
      startRotation(tx.events[1].args.wheelNumber.toString());

      setLoading(false);
      getPoolPrizeInfo();
      getTicketToken();
    } catch(error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <div>
      <PrizePoolCard
        donationTotal={donationTotal}
        poolPrize={poolPrize}
        awardedWon={awardedWon} />

      <DonationFormCard
        avaxBalance={avaxBalance}
        oneToUSDBalance={oneToUSDBalance}
        stakeWheelBlockchain={stakeWheelBlockchain}
        getPoolPrizeInfo={getPoolPrizeInfo}
        getBalance={getBalance} />

      <Typography.Title style={{ marginTop: '1rem', textAlign: 'center'}}>
        Stake Wheel
      </Typography.Title>

      <Row gutter={16}>
        <Col className="gutter-row" xs={{ span: 32 }} lg={{ span: 12 }}>
          <Wheel
            wheelclass={wheelclass}
            loading={loading}
            earnToken={earnToken}/>
        </Col>
        <Col className="gutter-row" xs={{ span: 32 }} lg={{ span: 12 }}>
          <Typography.Title level={2}>
            Your Spin Tickets: {tokenBalance / 10 ** 18}
          </Typography.Title >
          
          <Divider orientation="left">Your Winnings</Divider>
          <List
            style={{ backgroundColor: 'white'}}
            bordered
            itemLayout="horizontal">
              <List.Item>
                <List.Item.Meta
                  title={`AVAX : ${wonOne / 10 ** 18}`}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title={`Spin Tickets : ${usedTickets}`}
                />
              </List.Item>
          </List>

          <Divider orientation="left">Prize Information</Divider>
          <PrizeInformationCard />
        </Col>
      </Row>

      <ResultModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        result={result} />
    </div>
  )
}

export default SpinWheel;
