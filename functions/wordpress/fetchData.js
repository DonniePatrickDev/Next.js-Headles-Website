import useSWR from 'swr'
import { generatePassword, nameToUsername } from './util'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function getInsight(id) {
  const { data, error } = useSWR(
    `https://dhix.dhinsights.org/wp-json/wp/v2/insight/${id}`,
    fetcher
  )

  return {
    post: data,
    loading: !error && !data,
    error: error,
  }
}

export function getPost(id) {
  const { data, error } = useSWR(
    `https://dhix.dhinsights.org/wp-json/wp/v2/posts/${id}`,
    fetcher
  )

  return {
    post: data,
    loading: !error && !data,
    error: error,
  }
}

export function getPostCategory(id) {
  const { data, error } = useSWR(
    `https://dhix.dhinsights.org/wp-json/wp/v2/categories/${id}`,
    fetcher
  )

  return {
    post: data,
    loading: !error && !data,
    error: error,
  }
}

export function getInsightTags(id) {
  const { data, error } = useSWR(
    `https://dhix.dhinsights.org/wp-json/wp/v2/insight_tag?post=${id}`,
    fetcher
  )

  return {
    tags: data,
    loading: !error && !data,
    error: error,
  }
}

export function getPostTags(id) {
  const { data, error } = useSWR(
    `https://dhix.dhinsights.org/wp-json/wp/v2/tags?post=${id}`,
    fetcher
  )

  return {
    tags: data,
    loading: !error && !data,
    error: error,
  }
}

export function getAuthor(id) {
  const { data, error } = useSWR(
    `https://dhix.dhinsights.org/wp-json/wp/v2/users/${id}`,
    fetcher
  )

  return {
    author: data,
    authorLoading: !error && !data,
    authorError: error,
  }
}

export function getImage(id) {
  const { data, error } = useSWR(
    `https://dhix.dhinsights.org/wp-json/wp/v2/media/${id}`,
    fetcher
  )

  return {
    image: data,
    imageLoading: !error && !data,
    imageError: error,
  }
}

export function getInsights(page) {
  const { data, error } = useSWR(
    `https://dhix.dhinsights.org/wp-json/wp/v2/insight?filter[orderby]=date&order=desc&per_page=5&page=${page}`,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}

export function getMarketInsights() {
  const { data, error } = useSWR(
    `https://dhix.dhinsights.org/wp-json/wp/v2/market_insights?filter[orderby]=date&order=desc&per_page=100`,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}

export function getInsightsCategory(topic, page) {
  const { data, error } = useSWR(
    `https://dhix.dhinsights.org/wp-json/wp/v2/insight?filter[orderby]=date&order=desc&topic=${topic.id}&per_page=5&page=${page}`,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}

export function getMarketInsightTopic(topic) {
  const { data, error } = useSWR(
    `https://dhix.dhinsights.org/wp-json/wp/v2/market_insights?filter[orderby]=date&order=desc&market_insight_topics=${topic.id}&per_page=100`,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}

export function getPosts(page) {
  const { data, error } = useSWR(
    `https://dhix.dhinsights.org/wp-json/wp/v2/posts?filter[orderby]=date&order=desc&per_page=5&page=${page}`,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}

export function getPostsCategory(category, page) {
  const { data, error } = useSWR(
    `https://dhix.dhinsights.org/wp-json/wp/v2/posts?filter[orderby]=date&order=desc&categories=${category.id}&per_page=5&page=${page}`,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}

export function getSecondaryMenus() {
  const { data, error } = useSWR(
    `https://dhix.dhinsights.org/wp-json/menus/v1/menus/67`,
    fetcher
  )

  return {
    menus: data,
    loading: !error && !data,
    error: error,
  }
}

export function getSearchResults(query, page, sort) {
  let order = 'desc'
  if (sort === 1) order = 'asc'

  const { data, error } = useSWR(
    `https://dhix.dhinsights.org/wp-json/wp/v2/search?search=${query}&subtype=insight%20post&per_page=10&page=${page}&filter[orderby]=date&order=${order}`,
    fetcher
  )

  return {
    results: data,
    loading: !error && !data,
    error: error,
  }
}

export async function getSearchResultsCount(query, page) {
  const res = await fetch(
    `https://dhix.dhinsights.org/wp-json/wp/v2/search?search=${query}&subtype=insight%20post&per_page=10&page=${page}`
  )

  return {
    totalPages: res.headers.get('X-WP-TotalPages'),
    totalPosts: res.headers.get('X-WP-Total'),
  }
}

export async function registerUser({ email, name }) {
  const wpAppUser = process.env.NEXT_PUBLIC_WP_USERNAME
  const wpAppPass = process.env.NEXT_PUBLIC_WP_PASSWORD
  const wpAuthorization = Buffer.from(`${wpAppUser}:${wpAppPass}`).toString(
    'base64'
  )

  let myHeaders = new Headers()
  myHeaders.append('Authorization', `Basic ${wpAuthorization}`)

  let formdata = new FormData()
  formdata.append('username', nameToUsername(name))
  formdata.append('email', email)
  formdata.append('name', name)
  formdata.append('password', generatePassword())
  formdata.append('roles', ['subscriber'])

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  }

  const res = await fetch(
    'https://dhix.dhinsights.org/wp-json/wp/v2/users',
    requestOptions
  )

  return res
}

export function getPortalSettings() {
  const { data, error } = useSWR(
    'https://dhix.dhinsights.org/wp-json/acf/v3/options/options',
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}

export function getMarketInsightTags(id) {
  const { data, error } = useSWR(
    `https://dhix.dhinsights.org/wp-json/wp/v2/market_insight_tags?post=${id}`,
    fetcher
  )

  return {
    tags: data,
    loading: !error && !data,
    error: error,
  }
}

export function getMarketInsightTopics(id) {
  const { data, error } = useSWR(
    `https://dhix.dhinsights.org/wp-json/wp/v2/market_insight_topics?post=${id}`,
    fetcher
  )

  return {
    topics: data,
    loading: !error && !data,
    error: error,
  }
}

export function getAnnouncements(membership) {
  const { data, error } = useSWR(
    membership
      ? `https://backend.dhanalytics.org/api/announcements/?membership=${membership}`
      : null,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}
