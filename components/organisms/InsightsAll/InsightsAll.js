import { useEffect, useState } from 'react'
import styles from './InsightsAll.module.scss'
import SidebarSubscribe from '@/components/molecules/SidebarSubscribe'
import Button from '@/components/atoms/Button'
import { getInsights } from '@/functions/wordpress/fetchData'
import Ad from '@/components/molecules/Ad'
import PostCard from '@/components/molecules/PostCard'

export default function InsightsAll() {
  const [page, setPage] = useState(1)
  const [isEnd, setIsEnd] = useState(false)
  const [insights, setInsights] = useState([])

  const { data, loading } = getInsights(page)

  useEffect(() => {
    if (data && Array.isArray(data)) {
      if (data.length === 0) {
        setIsEnd(true)
      } else {
        setInsights([...insights, ...data])
      }
    }
  }, [data])

  return (
    <div className='container my-16'>
      <div className='flex flex-col md:flex-row gap-8 lg:gap-16 w-full'>
        <div className='flex-initial w-full md:w-3/4'>
          <h3 className={styles.title}>The Latest</h3>

          {Array.isArray(insights) &&
            insights.map((insight, index) => (
              <div className={styles.cardWrap} key={index}>
                <div className={styles.card}>
                  <PostCard
                    post={insight}
                    link={`/insight/${insight.slug}`}
                    linkText='Read Article'
                  />
                </div>
              </div>
            ))}

          <div className='text-center pt-4 pb-8'>
            <Button
              text='Load more Insights'
              type='primary'
              size='lg'
              onClick={() => setPage(page + 1)}
              disabled={isEnd || loading}
            />
          </div>
        </div>

        <div className='flex-initial w-full md:w-1/4'>
          <SidebarSubscribe />

          <div className='mb-4 p-4'>
            <Ad
              type='square'
              ad_image={page.acf?.ad_side?.ad_image}
              ad_link={page.acf?.ad_side?.ad_link}
              classes={page.acf?.ad_side?.ad_tracking_classes}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
