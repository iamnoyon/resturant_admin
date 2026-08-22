"use client"

import React from 'react'
import { useSelector } from 'react-redux';
import AdminDashboard from './AdminDashboard';
import SuperAdminDashboard from './SuperAdminDashboard';

const RenderDashboard = () => {
    const user = useSelector((state) => state?.user);
    const userRole = user?.role || '';

  return userRole == 'admin' ? <AdminDashboard /> : <SuperAdminDashboard />
  // return <AdminDashboard /> 
}

export default RenderDashboard