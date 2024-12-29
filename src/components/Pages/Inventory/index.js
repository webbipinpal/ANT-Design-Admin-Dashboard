import React, { useEffect, useState } from 'react'
import { Avatar, Rate, Space, Table, Typography } from 'antd';
import { getInoventry } from '../../API';
const Inventory = () => {
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
      title: "Rating",
      dataIndex: "rating",
      render: (rate) => {
        return <Rate value={rate} allowHalf disabled />
      }
    },
    {
      title: "Stock",
      dataIndex: "stock",
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "category",
      dataIndex: "category"
    }
  ];
  useEffect(() => {
    setLoading(true);
    getInoventry().then(res => {
      setDataSource(res.products);
      setLoading(false);
    })
  }, [])
  return (
    <Space direction='vertical'>
    <Typography.Title level={4}>Invetory</Typography.Title>
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

export default Inventory;