import React, { useEffect, useState } from 'react'
import { AppstoreOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

const SideMenu = () => {
  const location = useLocation()
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState('/');

  useEffect(() => {
    setSelectedKey(location.pathname)
  }, [location.pathname]);
  return (
    <div className='SiteMenu'>
      <Menu
      onClick={(items) => {
        navigate(items.key)
      }}
      selectedKeys={[selectedKey]}
      items={[
        {
          label: 'Dashboard',
          key: '/',
          icon: <AppstoreOutlined />
        },
        {
          label: 'Invetory',
          key: '/invetory',
          icon: <ShopOutlined />
        },
        {
          label: 'Order',
          key: '/orders',
          icon: <ShoppingCartOutlined />
        },
        {
          label: 'Customers',
          key: '/customers',
          icon: <UserOutlined />
        },
      ]}
      >

      </Menu>
    </div>
  )
}

export default SideMenu