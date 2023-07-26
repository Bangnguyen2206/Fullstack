/* eslint-disable @typescript-eslint/no-unused-vars */
import jwtDecode, { JwtPayload } from 'jwt-decode'

const JWTManager = () => {
  //   const LOGOUT_EVENT_NAME = 'jwt-logout'
  let inMemoryToken: string | null = null
  // let refreshTokenTimeoutId: number | null = null
  //   let userId: number | null = null
  const getRefreshtoken = async () => {
    const response = await fetch('http://localhost:4000/refresh_token', {
      credentials: 'include'
    })
    const data = await response.json() as {
      success: boolean,
      accessToken: string
    }
    setToken(data.accessToken)
  }


  const setRefreshTokenTimeout = (delay: number) => {
      // 5s before token expires
    window.setTimeout(getRefreshtoken, delay * 1000 - 5000)
  }

  const setToken = (accessToken: string) => {
    inMemoryToken = accessToken

    // Decode and set countdown to refresh token
    const decoded = jwtDecode<JwtPayload & { userId: number }>(accessToken)
    setRefreshTokenTimeout((decoded.exp as number) - (decoded.iat as number))
    return true
  }
  const getToken = () => inMemoryToken
  return { setToken, getToken }
}
export default JWTManager()
