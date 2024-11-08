import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function whoAmI(token) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', token)

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  }

  const { data, error } = useSWR(
    'https://rest.membersuite.com/platform/v2/whoami',
    fetcher(requestOptions)
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}
