import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';

function PrizePoolCard({ donationTotal, poolPrize, awardedWon, charityAmount, donationTotalUSD, poolPrizeUSD, awardedWonUSD, charityAmountUSD }) {
  return (
    <Card>
      <Row gutter={16} style={{ textAlign: "center"}}>
        <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 12 }}>
          <Statistic title="Total Amount Staked" value={`${donationTotal / 10 ** 18} AVAX ($${donationTotalUSD})`} />
        </Col>
        <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 12 }}>
          <Statistic title="Total Pool Prize" value={`${poolPrize / 10 ** 18} AVAX ($${poolPrizeUSD})`} />
        </Col>
        <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 12 }}>
          <Statistic title="Total Winnings Awarded" value={`${awardedWon / 10 ** 18} AVAX ($${awardedWonUSD})`} />
        </Col>
        <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 12 }}>
          <Statistic title="Total Charity Donation" value={`${charityAmount / 10 ** 18} AVAX ($${charityAmountUSD})`} />
        </Col>
      </Row>
    </Card>
  )
}

export default PrizePoolCard;
