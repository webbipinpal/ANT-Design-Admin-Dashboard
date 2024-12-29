import React, { useEffect, useState } from 'react'
import { Avatar, Rate, Space, Table, Typography } from 'antd';
import {getUsers } from '../../API';

const Customers = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: "Photo",
      dataIndex: "image",
      render: (link) => {
        return <Avatar src={link} />
      }
    },
    {
      title: 'First Name',
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (address) => {
        return <span>{address.address}, {address.city}, {address.state}, {address.postalCode},</span>
      }
    },
  ];
  useEffect(() => {
    setLoading(true);
    getUsers().then(res => {
      setDataSource(res.users);
      setLoading(false);
    })
  }, [])
  return (
    <Space direction='vertical'>
    <Typography.Title level={4}>Customers</Typography.Title>
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

export default Customers;