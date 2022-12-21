export interface IUser {
  userName: string
  email: string
  password: string
  phoneNumber: number[]
  address: string[]

  profileImage?: string
  isAdmin?: boolean
}
