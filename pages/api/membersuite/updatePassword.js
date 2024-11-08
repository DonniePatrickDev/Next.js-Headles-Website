export default async function handler(req, res) {
  const password = JSON.parse(req.body)

  const data = await fetch(
    'https://rest.membersuite.com/platform/v2/changePasswordOriginal',
    {
      method: 'POST',
      headers: {
        Authorization: password.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(password.passwordData),
      redirect: 'follow',
    }
  )

  if (data.status !== 200) {
    res.status(data.status).send()
  } else {
    return await res.status(200).send(data)
  }
}
