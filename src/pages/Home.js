import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';

import PrizePoolCard from '../components/PrizePoolCard';
import HomeImg from '../assets/home-img.png';

function Home({ stakeWheelBlockchain }) {
  const [donationTotal, setDonationTotal] = useState(0);
  const [poolPrize, setPoolPrize] = useState(0);
  const [awardedWon, setAwardedWon] = useState(0);
  const [charityAmount, setCharityAmount] = useState(0);
  const [donationTotalUSD, setDonationTotalUSD] = useState(0);
  const [poolPrizeUSD, setPoolPrizeUSD] = useState(0);
  const [awardedWonUSD, setAwardedWonUSD] = useState(0);
  const [charityAmountUSD, setCharityAmountUSD] = useState(0);

  useEffect(() => {
    if(stakeWheelBlockchain){
      getPoolPrizeInfo();
    }
  }, [stakeWheelBlockchain])

  const getPoolPrizeInfo = async () => {
    const donation = await stakeWheelBlockchain.totalDonation();
    setDonationTotal(donation);
    setDonationTotalUSD(await getValue(donation));

    const prize = await stakeWheelBlockchain.prizePool();
    setPoolPrizeUSD(await getValue(prize));
    setPoolPrize(prize);

    const award = await stakeWheelBlockchain.prizePoolWon();
    setAwardedWonUSD(await getValue(award));
    setAwardedWon(award);

    const charity = await stakeWheelBlockchain.charityAmount();
    setCharityAmountUSD(await getValue(charity));
    setCharityAmount(charity);
  }

  const getValue = async value => {
    const usdValue = await stakeWheelBlockchain.getThePrice();

    let totalUSDValue = (usdValue.toString() * value) / 10 ** 26;
    totalUSDValue = Number.parseFloat(totalUSDValue).toFixed(2);

    return totalUSDValue;
  }

  return <div>
    <PrizePoolCard
      donationTotal={donationTotal}
      poolPrize={poolPrize}
      awardedWon={awardedWon}
      charityAmount={charityAmount}
      donationTotalUSD={donationTotalUSD}
      poolPrizeUSD={poolPrizeUSD}
      awardedWonUSD={awardedWonUSD}
      charityAmountUSD={charityAmountUSD} />
    
    <Typography.Title className="primary-color" style={{ marginTop: '.5rem', marginBottom: '.5rem', textAlign: 'center'}}>
      How It Works
    </Typography.Title>
    <p style={{ fontSize: '1.4rem', textAlign: 'center'}}>
      Join our community to spin the staking reward prize wheel and earn charity donation tokens
    </p>
    <img src={HomeImg} style={{ width: "100%"}} alt="How it works" />
  </div>;
}

export default Home;
