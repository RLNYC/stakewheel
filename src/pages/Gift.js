import React, { useState } from 'react';
import { Spin, Card, Row, Col, Divider  } from 'antd';
import {
  HeartOutlined,
  SmileOutlined,
  TrophyOutlined
} from '@ant-design/icons';

import DonationFormCard from '../components/DonationFormCard';
import GiftFormCard from '../components/GiftFormCard';
import ChartiyIcon from '../assets/charity1.png';

function Gift({ walletAddress, giftTokenBlockchain }) {
  const [occasionNum, setOccasionNum] = useState(1);
  const [purchaseGiftTokensAmount, setPurchaseGiftTokensAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  function setPurchaseGiftTokens(value) {
    setPurchaseGiftTokensAmount(value);
  }

  return (
    <Spin spinning={loading}>
      <Card>
        <div style={{ display: "flex", alignItems: "center"}}>
          <img src={ChartiyIcon} alt="Chartiy" width={70} style={{ marginRight: "1rem" }} />
          <div>
            <p style={{ fontSize: "1.3rem", fontWeight: "bold", marginBottom: 0, marginTop: "1rem"}}>
              Donate directly to charities or gift your donation tokens to your friends or family.
            </p>
            <p style={{ fontSize: "1.3rem", fontWeight: "bold"}}>
              Only verified charities are able to redeem donation tokens for cash.
            </p>
          </div>
        </div>

        <DonationFormCard />
      </Card>
      <Divider orientation="left">Gift Your Donation Token</Divider>
      <Card>
        <h2>What's the Occasion?</h2>
        <Row gutter={16}>
          <Col
            className="gutter-col"
            sm={{ span: 12 }}
            md={{ span: 4 }}
            style={ occasionNum !== 1 && { color: '#d0d2d6'} }
            onClick={() => setOccasionNum(1)}
          >
            <HeartOutlined className="gift__icon" />
            <p style={{ textAlign: 'center' }}>Just for you</p>
          </Col>
          <Col
            className="gutter-col"
            sm={{ span: 12 }}
            md={{ span: 4 }}
            style={ occasionNum !== 2 && { color: '#d0d2d6'} }
            onClick={() => setOccasionNum(2)}
          >
            <SmileOutlined className="gift__icon" />
            <p style={{ textAlign: 'center' }}>Thank you</p>
          </Col>
          <Col
            className="gutter-col"
            sm={{ span: 12 }}
            md={{ span: 4 }}
            style={ occasionNum !== 3 && { color: '#d0d2d6'} }
            onClick={() => setOccasionNum(3)}
          >
            <TrophyOutlined className="gift__icon" />
            <p style={{ textAlign: 'center' }}>Congratulations</p>
          </Col>
        </Row>

        <GiftFormCard
          occasionNum={occasionNum}
          walletAddress={walletAddress}
          giftTokenBlockchain={giftTokenBlockchain} />
      </Card>
    </Spin>
  )
}

export default Gift;
