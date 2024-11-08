export default async function handler(req, res) {
  const user = JSON.parse(req.body)

  const data = await fetch(
    `https://rest.membersuite.com/security/v1/portalusers/${user.userId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: user.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user.userData),
      redirect: 'follow',
    }
  )

  if (data.status !== 200) {
    res.status(data.status).send()
  } else {
    return await res.status(200).send(data)
  }
}
