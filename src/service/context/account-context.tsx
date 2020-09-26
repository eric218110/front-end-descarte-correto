import AsyncStorage from '@react-native-community/async-storage'
import React, { createContext, useCallback, useContext } from 'react'
import { signInApi, UserProps } from '../api/signIn'
import { Account } from '../domain/account'

type AccountContextData = {
  signed: boolean
  signIn: (user: UserProps) => Promise<void>
}
const AccountContext = createContext<AccountContextData>(
  {} as AccountContextData
)

export const AccountProvider = ({
  children
}: {
  children: JSX.Element
}): JSX.Element => {
  const [accountContext, setAccountContext] = React.useState<Account>({
    id: '',
    name: '',
    email: '',
    token: '',
    role: ''
  })

  const signIn = useCallback(async (user: UserProps): Promise<void> => {
    const { email, name, token, role, id } = await signInApi(user)

    setAccountContext({
      id,
      name,
      email,
      token,
      role
    })

    await AsyncStorage.setItem(
      '@MyCredit:user',
      JSON.stringify({ email, name })
    )
    await AsyncStorage.setItem('@MyCredit:token', token)
  }, [])

  return (
    <AccountContext.Provider
      value={{
        signed: accountContext.id !== '',
        signIn: signIn
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}

export function useAccountContext(): AccountContextData {
  return useContext(AccountContext)
}
