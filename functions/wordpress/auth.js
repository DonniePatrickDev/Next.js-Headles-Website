export async function LoginUser(credentials) {
  const res = await fetch(process.env.NEXTAUTH_API_URL + '/token', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: { 'Content-Type': 'application/json' },
  })
  const user = await res.text()

  return user
}
