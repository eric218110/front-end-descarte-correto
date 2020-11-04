export type Account = {
  id: string
  name: string
  email: string
  accessToken: string
  role: string
  password: string
  passwordConfirmation: string
}

export enum Role {
  USER = 'user',
  ADMIN = 'admin'
}
