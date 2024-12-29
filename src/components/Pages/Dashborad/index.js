import React, { useEffect, useState } from 'react'
import { Card, Space, Statistic, Table, Typography } from 'antd';
import { DollarOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import { getInoventry, getOrders, getRevenue, getUsers } from '../../API';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const Dashboard = () => {
  const [order, setOrder] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customer, setCustomer] = useState(0);
  const [revenue, setRevenue] = useState(0);
  useEffect(() => {
    getOrders().then(res =>{
      return setOrder(Math.round(res.total));
    });
    getInoventry().then(res =>{
      return setInventory(Math.round(res.total));
    });
    getUsers().then(res =>{
      return setCustomer(Math.round(res.total));
    });
    getRevenue().then(res =>{
      return setRevenue(Math.round(res.total));
    });
  }, [])
  return (
    <>
    <Space size={20} direction='vertical'>
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction='horizontal'>
        <DashboardCard 
        icon={<ShoppingCartOutlined style={{color: 'black', backgroundColor: 'lightgreen', borderRadius: '50%', fontSize: 24, padding: 8}} />} title={'Orders'} value={order}
        />
        <DashboardCard icon={<ShoppingOutlined style={{color: 'black', backgroundColor: 'lightblue', borderRadius: '50%', fontSize: 24, padding: 8}} />} title={'Inventory'} value={inventory}/>
        <DashboardCard icon={<UserOutlined style={{color: 'black', backgroundColor: 'lightsalmon', borderRadius: '50%', fontSize: 24, padding: 8}} />} title={'Customers'} value={customer}/>
        <DashboardCard icon={<DollarOutlined style={{color: 'black', backgroundColor: 'lightsteelblue', borderRadius: '50%', fontSize: 24, padding: 8}} />} title={'Revenue'} value={revenue}/>
      </Space>
      <Space>
        <RecentOrder />
          <DashboardChart />
      </Space>
      </Space>
    </>
  )
}

const DashboardCard = ({title, value, icon}) => {
  return(
    <Card>
      <Space direction='horizontal'>
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  )
}

const RecentOrder = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    getOrders().then(res => {
      setDataSource(res.products.slice(0, 3))
      setLoading(false);
    })
  }, []);
  return(
    <>
    <Typography.Text>Recent Order</Typography.Text>
      <Table
      pagination={false}
      columns={[
        {
          title: 'Title',
          dataIndex: 'title'
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity'
        },
        {
          title: 'Price',
          dataIndex: 'discountedTotal'
        }
      ]}
      loading={loading}
      dataSource={dataSource}
      />
    </>
  )
}

const DashboardChart = () => {
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: []
  });
  useEffect(() => {
    getRevenue().then(res => {
      const labels = res.carts.map(item => `User ${item.userId}`);
      const data = res.carts.map(item => item.discountedTotal);

      const dataSource = {
        labels,
        datasets: [
          {
            label: 'Revenue',
            data: data,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      };
      setRevenueData(dataSource);
      
    })
  }, []);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  return(
    <>
    <Card style={{width: 400, height: 200}}> <Bar options={options} data={revenueData} /> </Card>
    </>
  )
}
export default Dashboard;