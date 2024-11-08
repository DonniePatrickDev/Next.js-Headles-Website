export default async function handler(req, res) {
  const { surveyId, progressId } = req.query

  const progressData = await fetch(
    `https://iad1.qualtrics.com/API/v3/surveys/${surveyId}/export-responses/${progressId}`,
    {
      method: 'GET',
      headers: {
        'X-API-TOKEN': process.env.NEXT_PUBLIC_QUALTRICS_TOKEN,
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
    }
  )
  const progress = await progressData.json()

  if (!progress.result) {
    return res.status(404).send()
  } else {
    return res.json(progress.result)
  }
}
