import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Pages/Dashborad';
import Customers from '../Pages/Customers';
import Inventory from '../Pages/Inventory';
import Orders from '../Pages/Orders';

const AppRoutes = () => {
  return (
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/invetory' element={<Inventory />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/customers' element={<Customers />} />
      </Routes>
  )
}

export default AppRoutes;