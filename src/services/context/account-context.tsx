import AsyncStorage from '@react-native-community/async-storage'
import React, { createContext, useCallback, useContext } from 'react'
import { signInApi, UserProps } from '../api/signIn'
import { SignUpApi, SignUpProps } from '../api/signUp'
import { Account } from '../domain/account'

type ResponseData = {
  success: boolean
  error: string
}

type AccountLoginData = Omit<
  Account,
  'id' | 'passwordConfirmation' | 'password'
>

type AccountContextData = {
  signed: boolean
  getAccount: AccountLoginData
  signIn: (user: UserProps) => Promise<ResponseData>
  signOut: () => Promise<boolean>
  signUp: (account: SignUpProps) => Promise<ResponseData>
}

const AccountContext = createContext<AccountContextData>(
  {} as AccountContextData
)

export const AccountProvider = ({
  children
}: {
  children: JSX.Element
}): JSX.Element => {
  const [accountContext, setAccountContext] = React.useState<AccountLoginData>({
    accessToken: '',
    email: '',
    name: '',
    role: ''
  })

  React.useEffect(() => {
    async function loadStorage() {
      const tokenStorage = await AsyncStorage.getItem('@TccApp:account:token')
      const emailStorage = await AsyncStorage.getItem('@TccApp:account:email')
      const nameStorage = await AsyncStorage.getItem('@TccApp:account:name')
      const roleStorage = await AsyncStorage.getItem('@TccApp:account:role')

      if (tokenStorage && emailStorage && nameStorage && roleStorage) {
        setAccountContext({
          accessToken: tokenStorage,
          email: emailStorage,
          name: nameStorage,
          role: roleStorage
        })
      }
    }

    loadStorage()
  }, [])

  const signIn = useCallback(async (user: UserProps): Promise<ResponseData> => {
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
    await AsyncStorage.setItem('@TccApp:account:role', account.role)
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
        name: '',
        role: ''
      })
      return true
    })
    return false
  }, [])

  const signUp = useCallback(
    async ({
      name,
      email,
      password,
      passwordConfirmation
    }: SignUpProps): Promise<ResponseData> => {
      const account = await SignUpApi({
        name,
        email,
        password,
        passwordConfirmation
      })
      if (!account.accessToken) {
        return {
          error: 'Email informado é invalido',
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
    },
    []
  )

  return (
    <AccountContext.Provider
      value={{
        signed: !!accountContext.accessToken,
        signIn,
        signOut,
        signUp,
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
