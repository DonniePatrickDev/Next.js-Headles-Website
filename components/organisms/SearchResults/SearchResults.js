import { useEffect, useState } from 'react'
import styles from './SearchResults.module.scss'
import {
  getSearchResults,
  getSearchResultsCount,
} from '@/functions/wordpress/fetchData'
import { useRouter } from 'next/router'
import Divider from '@/components/atoms/Divider/Divider'
import Pagination from '@/components/molecules/Pagination'
import SearchCard from '@/components/molecules/SearchCard'

export default function SearchResults() {
  const router = useRouter()
  const { q, sort } = router.query

  const [query, setquery] = useState('')

  const [page, setpage] = useState(1)
  const [totalPages, settotalPages] = useState(1)
  const [totalPosts, settotalPosts] = useState(0)

  useEffect(() => {
    setquery(q)

    async function fetchData() {
      const { totalPages, totalPosts } = await getSearchResultsCount(q, page)
      settotalPages(totalPages)
      settotalPosts(totalPosts)
    }
    fetchData()
  }, [q, page])

  const { results } = getSearchResults(q, page, sort)

  function createSlug(url) {
    if (url.endsWith('/')) {
      url = url.slice(0, url.length - 1)
    }
    let lastSlash = url.lastIndexOf('/') + 1
    let slug = url.substr(lastSlash, url.length)
    return slug
  }

  return (
    <div className='container xl:max-w-7xl my-16'>
      <h1 className='text-5xl text-purple-dark font-bold text-center mb-12'>
        Search Results for “
        <span className='capitalize'>{q?.replace('+', ' ')}</span>”
      </h1>

      <form
        action='/search'
        className='flex flex-col md:flex-row justify-center mb-12'
      >
        <input
          type='text'
          name='q'
          placeholder='Search by Keyword'
          className={styles.input}
          required
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />

        <select
          name='sort'
          className={styles.input}
          aria-label='Default select example'
          defaultValue='0'
          value={sort}
        >
          <option value='0'>Filter by Date: Newest First</option>
          <option value='1'>Filter by Date: Oldest First</option>
        </select>

        <input
          type='submit'
          className={styles.submit}
          value='Update & Filter'
        />
      </form>

      <Divider color='purple' />

      <p className='text-base text-purple-dark font-bold p-2 mb-8'>
        ({totalPosts}) Search Results for “
        <span className='capitalize'>{q?.replace('+', ' ')}</span>”
      </p>

      <div className=''>
        {Array.isArray(results) &&
          results.map((result, index) => (
            <div className={styles.cardRoot} key={index}>
              <div className={styles.cardWrap}>
                <SearchCard
                  type={result.subtype}
                  result={result}
                  link={`/${
                    result.subtype === 'post' ? 'news' : 'insight'
                  }/${createSlug(result.url)}`}
                  linkText={`Read ${
                    result.subtype === 'post' ? 'News' : 'Article'
                  }`}
                />
              </div>
            </div>
          ))}
      </div>

      <div className='text-center'>
        <Pagination
          className='pagination-bar'
          currentPage={page}
          totalCount={totalPages}
          pageSize={1}
          onPageChange={(page) => setpage(page)}
        />
      </div>
    </div>
  )
}
