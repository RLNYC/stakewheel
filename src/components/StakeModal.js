import React from 'react';
import { Modal, Button } from 'antd';

function StakeModal({ isModalVisible, setIsModalVisible, actionLoading, claimTicketTokens, unstakeAndBurnNF, selectnftid }) {
  return (
    <Modal
      title={`Claim Ticket Tokens (#${selectnftid?.toString()})`}
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      onOk={() => setIsModalVisible(false)}
      footer={[
        <Button key="back" onClick={() => setIsModalVisible(false)}>
          Return
        </Button>,
        <Button key="submit" type="primary" loading={actionLoading} onClick={() => unstakeAndBurnNF(selectnftid?.toString())}>
          Unstake
        </Button>,
        <Button
          type="primary"
          loading={actionLoading}
          onClick={() => claimTicketTokens(selectnftid?.toString())}
        >
          Continue
        </Button>,
      ]}>
      <p>Would you like to claim ticket tokens and continue staking or stop and get back AVAX?</p>
    </Modal>
  )
}

export default StakeModal;
