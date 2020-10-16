import React, { useCallback, useEffect, useState } from 'react'
import {
  Container,
  Avatar,
  IconAvatar,
  ActiveIcon,
  TextAvatar,
  ExitAppActionIconContent,
  ExitAppActionIcon,
  TextName,
  TextEmail,
  UserCircleIcon
} from './style'
import { useAccountContext } from '../../service/context/account-context'
import { AlertAnimatedSuccessLoggout } from '../Alert'

type Account = {
  name: string
  email: string
}

export const Header = (): JSX.Element => {
  const { signed, signOut, getAccount } = useAccountContext()
  const [activeAlert, setActiveAlert] = useState<boolean>(false)
  const [activeInScreen, setActiveInScreen] = useState<boolean>(signed)
  const [account, setAccount] = useState<Account>({ name: '', email: '' })

  useEffect(() => {
    async function setAccountDataInitial() {
      const { email, name } = getAccount
      setAccount({ email, name })
    }
    setAccountDataInitial()
  }, [])

  useEffect(() => {
    async function setAccountData() {
      const { email, name } = getAccount
      setAccount({ email, name })
    }
    setAccountData()
    setActiveInScreen(signed)
  }, [signed])

  const handleButtonSignOut = useCallback(async () => {
    await signOut()
    setActiveAlert(true)
    setTimeout(() => {
      setActiveInScreen(false)
      setActiveAlert(false)
    }, 3000)
  }, [activeAlert, activeInScreen])

  return (
    <>
      {activeInScreen && (
        <Container>
          <Avatar>
            <IconAvatar>
              <UserCircleIcon />
              <ActiveIcon />
            </IconAvatar>
            <TextAvatar>
              <TextName numberOfLines={1}>{account.name}</TextName>
              <TextEmail numberOfLines={1}>{account.email}</TextEmail>
            </TextAvatar>
          </Avatar>
          <ExitAppActionIconContent onPress={handleButtonSignOut}>
            <ExitAppActionIcon />
          </ExitAppActionIconContent>
        </Container>
      )}
      {activeAlert && <AlertAnimatedSuccessLoggout />}
    </>
  )
}
