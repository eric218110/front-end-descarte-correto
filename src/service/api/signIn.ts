import api from './index'
import { Account } from '../domain/account'

export interface UserProps
  extends Omit<Account, 'id' | 'token' | 'role' | 'name'> {
  password: string
}

export const signInApi = async (user: UserProps): Promise<Account> => {
  try {
    const { data } = await api.post<Account>('login', user)
    console.log(data)
    if (!data) {
      return {} as Account
    }
    return data
  } catch (error) {
    return {} as Account
  }
}
