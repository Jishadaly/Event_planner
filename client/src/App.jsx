import React from 'react'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AppRoutes from './routes'
import { useSelector } from 'react-redux'
import { SocketProvider } from './context/SocketContext'


export default function App() {
  return <AppRoutes />
}
