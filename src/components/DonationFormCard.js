import React, { useState } from 'react';
import { Card, Row, Col, Typography, Statistic } from 'antd';
import { Spin, Form, Input, Button, Select } from 'antd';
import { ethers } from 'ethers';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function DonationFormCard({ avaxBalance, oneToUSDBalance, stakeWheelBlockchain, getPoolPrizeInfo }) {
  const [form] = Form.useForm();

  const [usd, setUSD] = useState("0");
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try{
      setLoading(true);
      console.log(values);

      const ethToWei = ethers.utils.parseUnits(values.donationAmount, 'ether');
      const transaction = await stakeWheelBlockchain.stakeforTokens({ value: ethToWei });
      const tx = await transaction.wait();
      console.log(tx);
      setLoading(false);
      getPoolPrizeInfo();
    } catch(error) {
      console.error(error);
      setLoading(false);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Spin spinning={loading}>
      <Card>
        <Typography.Title style={{ marginTop: '0', marginBottom: '.5rem'}}>
          Donate to Win
        </Typography.Title>
        
        <Row gutter={16}>
          <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 8 }}>
            <p style={{ marginBottom: '1rem'}}>For every AVAX (Avalanche) donated to charities, you receive ten ticket to spin the stake wheel.</p>
            <Statistic title="Your Available AVAX" value={`${avaxBalance / 10 ** 18} AVAX ($${oneToUSDBalance})`} />
          </Col>
          <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 16 }}>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
              {/* <Form.Item
                name="charityList"
                label="Charity List"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Select Chartiy (Drop down list)"
                  allowClear
                >
                  <Select.Option value="0x83eb0e2e36da037d4a2f9145a2544252421d52d0">Red Cross</Select.Option>
                  <Select.Option value="0x41026a0c3880e0c6d19b0cdbb421f587f3029f40">Pet Shelter</Select.Option>
                </Select>
              </Form.Item> */}
              <Form.Item
                name="donationAmount"
                label="Donation Amount"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input addonAfter={`$${usd}`} placeholder="AVAX" />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Donate
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </Spin>
  )
}

export default DonationFormCard;
