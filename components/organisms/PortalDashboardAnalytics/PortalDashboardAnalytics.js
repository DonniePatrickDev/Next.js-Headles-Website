import Button from '@/components/atoms/Button'
import CardCarousel from '@/components/molecules/CardCarousel'
import PortalCard from '@/components/molecules/PortalCard'
import Link from 'next/link'
import cn from 'classnames'
import { useState } from 'react'
import styles from './PortalDashboardAnalytics.module.scss'

export default function PortalDashboardAnalytics({
  analytics,
  title,
  subtitle,
  carousel,
  level,
}) {
  const [page, setpage] = useState(1)

  return (
    <div className='mb-12'>
      {title && <h4 className='text-lg font-semibold text-gray'>{title}</h4>}

      {subtitle && (
        <p className='text-lg text-gray mb-5'>
          {level === 'market-research'
            ? 'Upgrade to Market Research + to access more features and custom reports.'
            : subtitle}
        </p>
      )}

      <div className='overflow-hidden'>
        <div
          className={cn(
            'flex flex-row gap-6 ease-in-out transition duration-200',
            !carousel && 'flex-wrap'
          )}
          style={
            carousel && {
              transform: `translateX(calc(-${100 * (page - 1)}% - ${
                24 * (page - 1)
              }px))`,
            }
          }
        >
          {level?.includes('provider') ? (
            <>
              {level?.includes('plus') ? (
                <>
                  {analytics &&
                    analytics.map((analysis, index) => {
                      return (
                        <PortalCard
                          key={index}
                          date={analysis.created_at}
                          type='Analytics'
                          tags={['custom']}
                          view={`/portal/analytics/${analysis.pk}`}
                          className={styles.card}
                        >
                          <h4 className='text-lg font-semibold mb-3'>
                            {analysis?.analysis_name}
                          </h4>
                        </PortalCard>
                      )
                    })}

                  <PortalCard background={true} className={styles.card}>
                    <h4 className='text-xl text-white font-semibold mb-3'>
                      <Link href='/portal/analytics/new/'>Run a Query</Link>
                    </h4>
                  </PortalCard>
                </>
              ) : (
                <>
                  {analytics &&
                    analytics.slice(0, 3).map((analysis, index) => {
                      return (
                        <PortalCard
                          key={index}
                          date={analysis.created_at}
                          type='Analytics'
                          tags={['custom']}
                          view={`/portal/analytics/${analysis.pk}`}
                          className={styles.card}
                        >
                          <h4 className='text-lg font-semibold mb-3'>
                            {analysis?.analysis_name}
                          </h4>
                        </PortalCard>
                      )
                    })}

                  {analytics?.length > 2 ? (
                    <PortalCard background={true} className={styles.card}>
                      <h4 className='text-xl text-white font-semibold mb-3'>
                        <Link href='/portal/membership/provider-upgrade'>
                          Upgrade to Provider+ to Run More Queries
                        </Link>
                      </h4>
                    </PortalCard>
                  ) : (
                    <PortalCard background={true} className={styles.card}>
                      <h4 className='text-xl text-white font-semibold mb-3'>
                        <Link href='/portal/analytics/new/'>Run a Query</Link>
                      </h4>
                    </PortalCard>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {level?.includes('plus') ? (
                <>
                  {analytics > 0 &&
                    analytics.map((analysis, index) => {
                      return (
                        <PortalCard
                          key={index}
                          date={analysis.created_at}
                          type='Analytics'
                          tags={['custom']}
                          view={`/portal/analytics/${analysis.pk}`}
                          className={styles.card}
                        >
                          <h4 className='text-lg font-semibold mb-3'>
                            {analysis?.analysis_name}
                          </h4>
                        </PortalCard>
                      )
                    })}

                  <PortalCard background={true} className={styles.card}>
                    <h4 className='text-xl text-white font-semibold mb-3'>
                      <Link href='/portal/analytics/new/'>Run a Query</Link>
                    </h4>
                  </PortalCard>
                </>
              ) : (
                <>
                  <PortalCard background={true} className={styles.card}>
                    <h4 className='text-xl text-white font-semibold px-4 mb-2'>
                      Upgrade to Market Research+ to Run Queries
                    </h4>
                    <Button
                      type='tertiary'
                      text='Learn More'
                      size='sm'
                      href='/portal/membership/market-research-upgrade'
                      className='mx-4 mt-4'
                    />
                  </PortalCard>

                  <PortalCard
                    background={true}
                    bgType='light'
                    className={cn(styles.card, 'text-center')}
                  >
                    <h4 className='text-xl text-purple font-semibold px-4 mb-2'>
                      2021 National Trends Report Analysis
                    </h4>
                    <div className='w-full text-center'>
                      <Button
                        type='tertiary'
                        text='Upgrade'
                        size='sm'
                        href='/portal/membership/market-research-upgrade'
                        className='mx-4 mt-4'
                      />
                    </div>
                  </PortalCard>

                  <PortalCard
                    background={true}
                    bgType='light'
                    className={cn(styles.card, 'text-center')}
                  >
                    <h4 className='text-xl text-purple font-semibold px-4 mb-2'>
                      2020 National Trends Report Analysis
                    </h4>
                    <div className='w-full text-center'>
                      <Button
                        type='tertiary'
                        text='Upgrade'
                        size='sm'
                        href='/portal/membership/market-research-upgrade'
                        className='mx-4 mt-4'
                      />
                    </div>
                  </PortalCard>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {carousel && (
        <div className='flex justify-end py-4'>
          <div className='hidden lg:block'>
            <CardCarousel
              currentPage={page}
              totalCount={!level?.includes('plus') ? 4 : analytics?.length + 1}
              pageSize={3}
              onPageChange={(page) => setpage(page)}
            />
          </div>
          <div className='lg:hidden max-w-full'>
            <CardCarousel
              currentPage={page}
              totalCount={!level?.includes('plus') ? 4 : analytics?.length + 1}
              pageSize={1}
              onPageChange={(page) => setpage(page)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
