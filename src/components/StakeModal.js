import React from 'react';
import { Modal, Button } from 'antd';

function StakeModal({ isModalVisible, setIsModalVisible, actionLoading, claimTicketTokens, unstakeAndBurnNF, nft }) {
  return (
    <Modal
      title={`Claim Ticket Tokens (#${nft?.nftid?.toString()})`}
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      onOk={() => setIsModalVisible(false)}
      footer={[
        <Button key="back" onClick={() => setIsModalVisible(false)}>
          Return
        </Button>,
        <Button key="submit" type="primary" loading={actionLoading} onClick={() => unstakeAndBurnNF(nft?.nftid?.toString())}>
          Unstake
        </Button>,
        <Button
          type="primary"
          loading={actionLoading}
          onClick={() => claimTicketTokens(nft?.nftid?.toString())}
        >
          Continue
        </Button>,
      ]}>
      <p>Would you like to claim ticket tokens and continue staking or stop and get back AVAX?</p>
    </Modal>
  )
}

export default StakeModal;
