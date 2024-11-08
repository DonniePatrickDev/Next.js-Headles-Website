export default async function handler(req, res) {
  const data = await fetch('https://iad1.qualtrics.com/API/v3/surveys/', {
    method: 'GET',
    headers: {
      'X-API-TOKEN': process.env.NEXT_PUBLIC_QUALTRICS_TOKEN,
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
  })

  if (data.status !== 200) {
    res.status(data.status).send()
  } else {
    return res.status(200).send(await data.json())
  }
}
