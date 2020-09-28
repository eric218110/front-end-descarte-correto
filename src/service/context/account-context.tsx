import AsyncStorage from '@react-native-community/async-storage'
import React, { createContext, useCallback, useContext } from 'react'
import { signInApi, UserProps } from '../api/signIn'
import { Account } from '../domain/account'

type ResponseSignIn = {
  success: boolean
  error: string
}

type AccountWithoutIdAndRole = Omit<Account, 'id' | 'role'>

type AccountContextData = {
  signed: boolean
  getAccount: AccountWithoutIdAndRole
  signIn: (user: UserProps) => Promise<ResponseSignIn>
  signOut: () => Promise<boolean>
}

const AccountContext = createContext<AccountContextData>(
  {} as AccountContextData
)

export const AccountProvider = ({
  children
}: {
  children: JSX.Element
}): JSX.Element => {
  const [accountContext, setAccountContext] = React.useState<
    AccountWithoutIdAndRole
  >({
    accessToken: '',
    email: '',
    name: ''
  })

  React.useEffect(() => {
    async function loadStorage() {
      const tokenStorage = await AsyncStorage.getItem('@TccApp:account:token')
      const emailStorage = await AsyncStorage.getItem('@TccApp:account:email')
      const nameStorage = await AsyncStorage.getItem('@TccApp:account:name')

      if (tokenStorage && emailStorage && nameStorage) {
        setAccountContext({
          accessToken: tokenStorage,
          email: emailStorage,
          name: nameStorage
        })
      }
    }

    loadStorage()
  }, [])

  const signIn = useCallback(async (user: UserProps): Promise<
    ResponseSignIn
  > => {
    const account = await signInApi(user)
    if (!account.accessToken) {
      return {
        error: 'Email ou senha invalidos',
        success: false
      }
    }
    await AsyncStorage.setItem('@TccApp:account:token', account.accessToken)
    await AsyncStorage.setItem('@TccApp:account:email', account.email)
    await AsyncStorage.setItem('@TccApp:account:name', account.name)
    setAccountContext(account)
    return {
      error: '',
      success: true
    }
  }, [])

  const signOut = useCallback(async (): Promise<boolean> => {
    AsyncStorage.clear().then(() => {
      setAccountContext({
        accessToken: '',
        email: '',
        name: ''
      })
      return true
    })
    return false
  }, [])

  return (
    <AccountContext.Provider
      value={{
        signed: !!accountContext.accessToken,
        signIn,
        signOut,
        getAccount: accountContext
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}

export function useAccountContext(): AccountContextData {
  return useContext(AccountContext)
}
