import api from './index'
import { Account } from '../domain/account'

export type UserProps = Omit<
  Account,
  'id' | 'accessToken' | 'role' | 'name' | 'passwordConfirmation'
>

export const signInApi = async (user: UserProps): Promise<Account> => {
  try {
    const { data } = await api.post<Account>('login', user)

    if (!data) {
      return {} as Account
    }
    return data
  } catch (error) {
    return {} as Account
  }
}
