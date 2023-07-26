import { Link, Outlet } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { useLogoutMutation } from '../gql/graphql'
import JWTManager from '../utils/jwt'

export default function Layout() {
  const { isAuthenticated, logoutClient } = useAuthContext()
  const [logoutServer, _] = useLogoutMutation()

  const logout = async () => {
    logoutClient()
    await logoutServer({
      variables: { userId: JWTManager.getUserId()?.toString() as string },
    })
  }
  return (
    <div>
      <h1>JWT AUTHENTICATION FULL STACK</h1>
      <nav style={{ borderBottom: '1px solid', paddingBottom: '1rem' }}>
        <Link to=".">Home</Link> | <Link to="login">Login</Link> |{' '}
        <Link to="register">Register</Link> | <Link to="profile">Profile</Link>{' '}
        {isAuthenticated && (
          <>
            | <button onClick={logout}>Logout</button>
          </>
        )}
      </nav>
      <Outlet />
    </div>
  )
}
