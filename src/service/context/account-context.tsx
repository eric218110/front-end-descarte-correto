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

  React.useEffect(() => {
    async function loadStorage() {
      const UserStorage = await AsyncStorage.getItem('@TccApp:account')

      if (UserStorage) {
        setAccountContext(JSON.parse(UserStorage))
      }
    }

    loadStorage()
  }, [])

  const signIn = useCallback(async (user: UserProps): Promise<void> => {
    const account = await signInApi(user)
    setAccountContext(account)

    await AsyncStorage.setItem('@TccApp:account', JSON.stringify(account))
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
