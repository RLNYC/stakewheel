import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';

import PrizePoolCard from '../components/PrizePoolCard';
import HomeImg from '../assets/home-img.png';

function Home({ stakeWheelBlockchain }) {
  const [donationTotal, setDonationTotal] = useState(0);
  const [poolPrize, setPoolPrize] = useState(0);
  const [awardedWon, setAwardedWon] = useState(0);
  const [charityAmount, setCharityAmount] = useState(0);

  useEffect(() => {
    if(stakeWheelBlockchain){
      getPoolPrizeInfo();
    }
  }, [stakeWheelBlockchain])

  const getPoolPrizeInfo = async () => {
    const donation = await stakeWheelBlockchain.totalDonation();
    setDonationTotal(donation);

    const prize = await stakeWheelBlockchain.prizePool();
    setPoolPrize(prize);

    const award = await stakeWheelBlockchain.prizePoolWon();
    setAwardedWon(award);

    const charity = await stakeWheelBlockchain.charityAmount();
    setCharityAmount(charity);
  }

  return <div>
    <PrizePoolCard
      donationTotal={donationTotal}
      poolPrize={poolPrize}
      awardedWon={awardedWon}
      charityAmount={charityAmount} />
    
    <Typography.Title className="primary-color" style={{ marginTop: '.5rem', marginBottom: '.5rem', textAlign: 'center'}}>
      How It Works
    </Typography.Title>
    <p style={{ fontSize: '1.4rem', textAlign: 'center'}}>
      Participate in our staking pool and spin the prize wheel to win the staking awards and More... 
    </p>
    <img src={HomeImg} style={{ width: "100%"}} alt="How it works" />
  </div>;
}

export default Home;
