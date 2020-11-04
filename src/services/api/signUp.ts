import api from './index'
import { Account } from '../domain/account'

export type SignUpProps = Omit<Account, 'id' | 'accessToken' | 'role'>

export const SignUpApi = async (user: SignUpProps): Promise<Account> => {
  try {
    const { data } = await api.post<Account>('signup', user)
    if (!data) {
      return {} as Account
    }
    return data
  } catch (error) {
    return {} as Account
  }
}
