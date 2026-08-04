"use client"

import { FaUser, FaShoppingCart, FaDollarSign, FaTable, FaBox, FaMoneyBillWave } from 'react-icons/fa'

const dummyStats = [
  {
    id: 1,
    title: 'Total Users',
    value: 1250,
    iconName: FaUser,
    trendValue: 12,
    trend: 'up',
    borderColor: 'border-b-blue-500',
  },
  {
    id: 2,
    title: 'Total Orders',
    value: 3420,
    iconName: FaShoppingCart,
    trendValue: 8,
    trend: 'up',
    borderColor: 'border-b-orange-500',
  },
  {
    id: 3,
    title: 'Total Revenue',
    value: '$84,500',
    iconName: FaDollarSign,
    trendValue: 15,
    trend: 'up',
    borderColor: 'border-b-green-500',
  },
  {
    id: 4,
    title: 'Total Tables',
    value: 45,
    iconName: FaTable,
    trendValue: 3,
    trend: 'down',
    borderColor: 'border-b-purple-500',
  },
  {
    id: 5,
    title: 'Total Products',
    value: 230,
    iconName: FaBox,
    trendValue: 5,
    trend: 'up',
    borderColor: 'border-b-cyan-500',
  },
  {
    id: 6,
    title: 'Total Expenses',
    value: '$32,100',
    iconName: FaMoneyBillWave,
    trendValue: 7,
    trend: 'down',
    borderColor: 'border-b-red-500',
  },
]

export default dummyStats
