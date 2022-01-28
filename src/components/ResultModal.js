import React from 'react';
import { Modal } from 'antd';

function ResultModal({ isModalVisible, setIsModalVisible, result }) {
  return (
    <Modal title="You Won" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} onOk={() => setIsModalVisible(false)}>
      <p>{result}</p>
      <p>
        Make a <a href={`https://twitter.com/intent/tweet?text=I%20won%20prize%20at%20Stake%20Wheel&url=https://images.unsplash.com/photo-1643233963072-b38c7ff3e512?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60`} target="_blank" rel="noopener noreferrer">Tweet</a> about your winning
      </p>
    </Modal>
  )
}

export default ResultModal;
