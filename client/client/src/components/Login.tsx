import { useState, FormEvent } from 'react'
import { useLoginMutation } from '../gql/graphql'
import { useNavigate } from 'react-router-dom'
import JWTManager from '../utils/jwt'
import { useAuthContext } from '../contexts/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const { setIsAuthenticated } = useAuthContext()

  const [login, _] = useLoginMutation()
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await login({
      variables: { loginInput: { username, password } },
    })
    if (response.data?.login.success) {
      JWTManager.setToken(response.data.login.accessToken as string)
      navigate('..')
      setIsAuthenticated(true)
    } else {
      if (response.data?.login.message) setError(response.data.login.message)
    }
  }
  return (
    <>
      {error && <h3 style={{ color: 'red' }}>{error}</h3>}
      <form style={{ marginTop: '1rem' }} onSubmit={onSubmit}>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </>
  )
}
