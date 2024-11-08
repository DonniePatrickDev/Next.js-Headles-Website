export default async function handler(req, res) {
  const { surveyId, fileId } = req.query

  const data = await fetch(
    `https://iad1.qualtrics.com/API/v3/surveys/${surveyId}/export-responses/${fileId}/file`,
    {
      method: 'GET',
      headers: {
        'X-API-TOKEN': process.env.NEXT_PUBLIC_QUALTRICS_TOKEN,
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
    }
  )

  const responses = await data.json()

  if (data.status !== 200) {
    res.status(data.status).send()
  } else {
    return res.status(200).send(responses.responses)
  }
}
