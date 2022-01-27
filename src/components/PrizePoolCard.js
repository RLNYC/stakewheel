import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';

function PrizePoolCard({ donationTotal, poolPrize, awardedWon }) {
  return (
    <Card>
      <Row gutter={16} style={{ textAlign: "center"}}>
        <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 12 }}>
          <Statistic title="Total Amount Staked" value={`${donationTotal / 10 ** 18} AVAX`} />
        </Col>
        <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 12 }}>
          <Statistic title="Total Pool Prize" value={`${poolPrize / 10 ** 18} AVAX`} />
        </Col>
        <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 12 }}>
          <Statistic title="Total Winnings Awarded" value={`${awardedWon / 10 ** 18} AVAX`} />
        </Col>
        <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 12 }}>
          <Statistic title="Total Charity Donation" value={`${0 / 10 ** 18} AVAX`} />
        </Col>
      </Row>
    </Card>
  )
}

export default PrizePoolCard;
