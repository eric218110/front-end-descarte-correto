import React from 'react'
import { useAccountContext } from '../../../service/context/account-context'
import { Account } from '../../Account'
import { AddPoint as AddPointScreen } from './AddPoint'

export const AddPoint = (): JSX.Element => {
  const { signed } = useAccountContext()
  return signed ? <AddPointScreen /> : <Account />
}
