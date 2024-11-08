export default async function handler(req, res) {
  const { surveyId } = req.query

  const startData = await fetch(
    `https://iad1.qualtrics.com/API/v3/surveys/${surveyId}/export-responses`,
    {
      method: 'POST',
      headers: {
        'X-API-TOKEN': process.env.NEXT_PUBLIC_QUALTRICS_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        format: 'json',
        compress: 'false',
      }),
      redirect: 'follow',
    }
  )
  const start = await startData.json()

  if (!start.result) {
    return res.status(500).send()
  } else {
    return res.json(start.result)
  }
}
