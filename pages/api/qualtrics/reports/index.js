export default async function handler(req, res) {
  const data = await fetch(
    'https://dhix.dhinsights.org/wp-json/wp/v2/qualtrics/1358',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
    }
  )

  if (data.status !== 200) {
    res.status(data.status).send()
  } else {
    return res.status(200).send(await data.json())
  }
}
