import React from 'react'
import { AppRoutes } from './app-routes'
import { AccountProvider } from '../service/context/account-context'
import { PointProvider } from '../service/context/point-context'

export const Routes: React.FC = () => (
  <AccountProvider>
    <PointProvider>
      <AppRoutes />
    </PointProvider>
  </AccountProvider>
)
