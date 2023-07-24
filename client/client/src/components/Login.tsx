import { useState, FormEvent } from 'react'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    console.log(event)
  }
  return (
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
  )
}
