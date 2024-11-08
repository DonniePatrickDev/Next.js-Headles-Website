import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())
const authFetcher = (...args) =>
  fetch(...args, {
    headers: {
      'X-API-TOKEN': process.env.NEXT_PUBLIC_QUALTRICS_TOKEN,
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())

export function getSurveys() {
  const { data, error } = useSWR('/api/qualtrics/getSurveys', fetcher)

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}

export function getMySurveys(email) {
  const { data, error } = useSWR(
    email
      ? `https://backend.dhanalytics.org/api/surveys/?email=${email}`
      : null,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}

export function getAnalytics(email) {
  const { data, error } = useSWR(
    email
      ? `https://backend.dhanalytics.org/api/analytics/?email=${email}`
      : null,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}

export function getAnalysis(id) {
  const { data, error } = useSWR(
    id ? `https://backend.dhanalytics.org/api/analytics/${id}` : null,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}

export function getReports(email) {
  const { data, error } = useSWR(
    email
      ? `https://backend.dhanalytics.org/api/reports/?email=${email}`
      : null,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}

export function getReport(id) {
  const { data, error } = useSWR(
    id ? `https://backend.dhanalytics.org/api/reports/${id}` : null,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}

export function getResults(email) {
  const { data, error } = useSWR(
    email
      ? `https://backend.dhanalytics.org/api/memberships/?email=${email}`
      : null,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}

export function getSurvey(id) {
  const { data, error } = useSWR(
    id ? `/api/qualtrics/getSurveys/${id}` : null,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}

export function startResponses(surveyId) {
  const { data, error } = useSWR(
    surveyId ? `/api/qualtrics/${surveyId}/startResponses/` : null,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}

export function progressResponses(surveyId, progressId) {
  const { data, error } = useSWR(
    surveyId && progressId
      ? `/api/qualtrics/${surveyId}/progressResponses/${progressId}`
      : null,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}

export function getResponses(surveyId, fileId) {
  const { data, error } = useSWR(
    surveyId && fileId
      ? `https://iad1.qualtrics.com/API/v3/surveys/${surveyId}/export-responses/${fileId}/file`
      : null,
    authFetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}
