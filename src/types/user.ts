export interface IAuth {
  user: IUser
  expires: string
}

export interface IUser {
  name: string
  email: string
  image: string
}