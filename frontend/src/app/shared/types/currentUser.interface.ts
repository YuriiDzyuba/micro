export interface CurrentUserInterface {
  userId : string
  userName: string
  email: string
  roles: string
  picture: string | null
  token: string
  accessToken: string
  refreshToken: string
}
