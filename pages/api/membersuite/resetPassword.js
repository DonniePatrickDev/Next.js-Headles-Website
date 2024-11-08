async function anonymousToken() {
  const res = await fetch(
    `${process.env.MEMBERSUITE_API_URL}/anonymoustoken/33409`,
    {
      method: 'GET',
    }
  )

  if (res.status !== 200) {
    return null
  } else {
    return await res.text()
  }
}

export default async function handler(req, res) {
  const token = await anonymousToken()
  if (!token) {
    return res.status(500).send()
  }

  const myHeaders = new Headers()
  myHeaders.append('Authorization', token)
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify({
    username: req.body?.email,
    code: req.body?.code,
    newPassword: req.body?.newPassword,
    clientID: process.env.MEMBERSUITE_CLIENT_ID,
  })

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  }

  const data = await fetch(
    'https://rest.membersuite.com/platform/v2/confirmforgotpassword/33409',
    requestOptions
  )

  if (data.status !== 200) {
    return res.status(400).send(data)
  } else {
    return res.status(200).send()
  }
}
