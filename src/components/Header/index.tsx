import React, { useEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { colors } from '../../styles/colors'
import LogoSVG from '../../assets/logo.svg'
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
  EnterAppActionIcon
} from './style'

type Account = {
  name: string
  email: string
}

export const Header = (): JSX.Element => {
  const [account, setAccount] = useState<Account>({ name: '', email: '' })
  const [logged, setLogged] = useState<boolean>(false)

  useEffect(() => {
    async function getAccount() {
      setAccount({
        name: 'Fake User name',
        email: 'fakeemail@email.com'
      })
    }
    getAccount()
  }, [])

  useEffect(() => {
    async function getActiveUser() {
      return setLogged(false)
    }
    getActiveUser()
  }, [])
  return (
    <Container>
      {logged ? (
        <>
          <Avatar>
            <IconAvatar>
              <FontAwesome
                name="user-circle-o"
                size={29}
                color={colors.primary}
              />
              <ActiveIcon />
            </IconAvatar>
            <TextAvatar>
              <TextName numberOfLines={1}>{account.name}</TextName>
              <TextEmail numberOfLines={1}>{account.email}</TextEmail>
            </TextAvatar>
          </Avatar>
        </>
      ) : (
        <>
          <Avatar>
            <LogoSVG width={35} />
          </Avatar>
        </>
      )}
      <ExitAppActionIconContent>
        {logged ? <ExitAppActionIcon /> : <EnterAppActionIcon />}
      </ExitAppActionIconContent>
    </Container>
  )
}
