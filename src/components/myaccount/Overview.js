import React, { useEffect, useState } from 'react';
import { Table, Space } from 'antd';

import { getDate } from '../../utils/date'; 

function Overview({ walletAddress, stakeWheelBlockchain }) {
  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    if(stakeWheelBlockchain) getNFTs();
  }, [stakeWheelBlockchain]);

  const getNFTs = async () => {
    const totalSupply = await stakeWheelBlockchain.totalSupply();
    let oldnfts = [];

    for(let i = 1; i <= +totalSupply; i++){
      const tokenOwner = await stakeWheelBlockchain.ownerOf(i);
      
      if(tokenOwner === walletAddress){
        let data = await stakeWheelBlockchain.stakelist(i);
        console.log(data);
        oldnfts.push(data);
      }
    }
    console.log(oldnfts);
    setNFTs(oldnfts);
  }

  const columns = [
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: text => <p>{getDate(text.toString())}</p>,
    },
    {
      title: 'Claim Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: text => <p>{getDate(+text.toString() + + 17543)}</p>,
    },
    {
      title: 'Deposits in Staking Pool',
      dataIndex: 'stakeAmount',
      key: 'stakeAmount',
      render: text => <p>{text.toString() / 10 ** 18} AVAX</p>,
    },
    {
      title: 'Upcoming Ticket Tokens',
      dataIndex: 'stakeAmount',
      key: 'stakeAmount',
      render: text => <p>{text.toString() / 10 ** 18 * 2} TKT</p>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Claim {record.name}</a>
        </Space>
      ),
    },
  ];

  return <div>
    <Table columns={columns} dataSource={nfts} />
  </div>;
}

export default Overview;
