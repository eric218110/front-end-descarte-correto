import React from 'react'
import { AppRoutes } from './app-routes'
import { AccountProvider } from '../service/context/account-context'

export const Routes: React.FC = () => (
  <AccountProvider>
    <AppRoutes />
  </AccountProvider>
)
