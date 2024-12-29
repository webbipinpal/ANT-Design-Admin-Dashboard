import { Image, Typography, Space, Badge, Drawer, List } from 'antd';
import React, { useEffect, useState } from 'react'
import logo from '../../images/logo.jpg';
import { BellOutlined, MailOutlined } from '@ant-design/icons';
import { getComments, getOrders } from '../API';
const AppHeader = () => {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [drawerComments, setDrawerComments] = useState(false);
  const [drawerOrders, setDrawerOrders] = useState(false);
  useEffect(() => {
    getComments().then(res => {
      setComments(res.comments)
    });
    getOrders().then(res => {
      setOrders(res.products)
    })
  }, []);
  console.log(comments)
  return (
    <div className='AppHeader'>
      <Image src={logo} width={40} preview={false}/>
      <Typography.Title level={3}>Company</Typography.Title>
      <Space size={15}>
        <Badge count={comments.length} dot>
          <MailOutlined style={{fontSize: '24px'}} onClick={() => setDrawerComments(true)} />
        </Badge>
        <Badge count={orders.length}>
          <BellOutlined style={{fontSize: '24px'}} onClick={() => setDrawerOrders(true)}/>
        </Badge>
      </Space>
      <Drawer title="Comments" open={drawerComments} onClose={() => setDrawerComments(false)}>
         <List
         dataSource={comments}
          renderItem={(item, index) => (
            <List.Item >
              {item.body}
            </List.Item>
          )}
        />
      </Drawer>
      <Drawer title="Comments" open={drawerOrders} onClose={() => setDrawerOrders(false)}>
         <List
         dataSource={orders}
          renderItem={(item, index) => (
            <List.Item>
              <Typography.Text strong>{item.title}</Typography.Text> has been placed.
            </List.Item>
          )}
        />
      </Drawer>
    </div>
  )
}

export default AppHeader;