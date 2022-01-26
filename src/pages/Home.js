import React, { useEffect, useState } from 'react';

import PrizePoolCard from '../components/PrizePoolCard';


function Home({ stakeWheelBlockchain }) {
  const [donationTotal, setDonationTotal] = useState(0);
  const [poolPrize, setPoolPrize] = useState(0);
  const [awardedWon, setAwardedWon] = useState(0);

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
  }

  return <div>
    <PrizePoolCard
      donationTotal={donationTotal}
      poolPrize={poolPrize}
      awardedWon={awardedWon} />
  </div>;
}

export default Home;
