import AsyncStorage from '@react-native-community/async-storage'
import React, { createContext, useCallback, useContext } from 'react'
import { signInApi, UserProps } from '../api/signIn'

type ResponseSignIn = {
  success: boolean
  error: string
}

type AccountContextData = {
  signed: boolean
  signIn: (user: UserProps) => Promise<ResponseSignIn>
}
const AccountContext = createContext<AccountContextData>(
  {} as AccountContextData
)

export const AccountProvider = ({
  children
}: {
  children: JSX.Element
}): JSX.Element => {
  const [accountContext, setAccountContext] = React.useState<{
    accessToken: string
  }>({
    accessToken: ''
  })

  React.useEffect(() => {
    async function loadStorage() {
      const accessToken = await AsyncStorage.getItem('@TccApp:account:token')
      if (accessToken) {
        setAccountContext({
          accessToken: accessToken
        })
      }
      console.log(accessToken)
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
    setAccountContext(account)
    return {
      error: '',
      success: true
    }
  }, [])

  return (
    <AccountContext.Provider
      value={{
        signed: !!accountContext.accessToken,
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
