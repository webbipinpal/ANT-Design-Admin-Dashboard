import React, { useEffect, useState } from 'react'
import { Avatar, Rate, Space, Table, Typography } from 'antd';
import { getOrders } from '../../API';

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      render: (link) => {
        return <Avatar src={link} />
      }
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (value) => `$ ${value}`
    },
    {
      title: "Discounted Total",
      dataIndex: "discountedTotal",
      render: (value) => `$ ${value}`
    },
    {
      title: "quantity",
      dataIndex: "quantity"
    },
  ];
  useEffect(() => {
    setLoading(true);
    getOrders().then(res => {
      setDataSource(res.products);
      setLoading(false);
    })
  }, [])
  return (
    <Space direction='vertical'>
    <Typography.Title level={4}>Orders</Typography.Title>
    <Table
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      tableLayout='auto'
      pagination={{
        pageSize: 5
      }}
    />
  </Space>
  )
}

export default Orders;