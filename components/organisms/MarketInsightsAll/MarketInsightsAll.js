import { useState } from 'react'
import styles from './MarketInsightsAll.module.scss'
import { getMarketInsights } from '@/functions/wordpress/fetchData'
import Ad from '@/components/molecules/Ad'
import Pagination from '@/components/molecules/Pagination'
import SponsoredBy from '@/components/molecules/SponsoredBy'
import MarketInsightCard from '@/components/molecules/MarketInsightCard'

export default function MarketInsightsAll({
  ad_image,
  ad_link,
  classes,
  level,
}) {
  const [page, setPage] = useState(1)
  const { data: insightsData } = getMarketInsights()

  const insights =
    insightsData && !level?.includes('plus')
      ? insightsData.filter((insight) => !insight.acf?.is_premium)
      : insightsData

  const pageInsights = insights?.slice(2 * (page - 1), 2 * page)

  return (
    <>
      <div className='my-16'>
        <div className='flex flex-col gap-8 w-full'>
          <Ad ad_image={ad_image} ad_link={ad_link} classes={classes} />

          <div className='flex-initial w-full'>
            <h3 className={styles.title}>Market Insights</h3>

            {Array.isArray(pageInsights) &&
              pageInsights.map((insight, index) => (
                <div className={styles.cardWrap} key={index}>
                  <div className={styles.card}>
                    <MarketInsightCard
                      post={insight}
                      link={`/market-insights/${insight.slug}`}
                      linkText='Read Article'
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className='text-center'>
          <Pagination
            className='pagination-bar'
            currentPage={page}
            totalCount={insights?.length || 2}
            pageSize={2}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>

      <div className='my-16'>
        <SponsoredBy />
      </div>
    </>
  )
}
