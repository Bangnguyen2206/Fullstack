import { useUsersQuery } from '../generated/graphql'

export default function Home() {
  const { data, loading } = useUsersQuery({
    fetchPolicy: 'no-cache',
  })
  if (loading) return <h1>Loading</h1>
  return (
    <ul>
      {data?.users.map((user: any) => (
        <li key={user.id}>{user.username}</li>
      ))}
    </ul>
  )
}
