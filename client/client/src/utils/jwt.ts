// import jwtDecode, { JwtPayload } from 'jwt-decode'

const JWTManager = () => {
  //   const LOGOUT_EVENT_NAME = 'jwt-logout'
  let inMemoryToken: string | null = null
  //   let refreshTokenTimeoutId: number | null = null
  //   let userId: number | null = null

  const setToken = (accessToken: string) => {
    inMemoryToken = accessToken
  }
  const getToken = () => inMemoryToken
  return { setToken, getToken }
}
export default JWTManager()
