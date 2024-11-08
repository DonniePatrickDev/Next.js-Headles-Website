import Button from '@/components/atoms/Button'
import CardCarousel from '@/components/molecules/CardCarousel'
import PortalCard from '@/components/molecules/PortalCard'
import Link from 'next/link'
import cn from 'classnames'
import { useState } from 'react'
import styles from './PortalDashboardReports.module.scss'

export default function PortalDashboardReports({
  reports,
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
                  {reports &&
                    reports.map((report, index) => {
                      return (
                        <PortalCard
                          key={index}
                          date={report.created_at}
                          type='Reports'
                          tags={['custom']}
                          view={`/portal/reports/${report.pk}`}
                          className={styles.card}
                        >
                          <h4 className='text-lg font-semibold mb-3'>
                            {report?.report_name}
                          </h4>
                        </PortalCard>
                      )
                    })}

                  <PortalCard background={true} className={styles.card}>
                    <h4 className='text-xl text-white font-semibold mb-3'>
                      <Link href='/portal/reports/new/'>
                        Create a New Report
                      </Link>
                    </h4>
                  </PortalCard>
                </>
              ) : (
                <>
                  {reports &&
                    reports.slice(0, 3).map((report, index) => {
                      return (
                        <PortalCard
                          key={index}
                          date={report.created_at}
                          type='Reports'
                          tags={['custom']}
                          view={`/portal/reports/${report.pk}`}
                          className={styles.card}
                        >
                          <h4 className='text-lg font-semibold mb-3'>
                            {report?.report_name}
                          </h4>
                        </PortalCard>
                      )
                    })}

                  {reports?.length > 2 ? (
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
                        <Link href='/portal/reports/new/'>
                          Create a New Report
                        </Link>
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
                  {reports &&
                    reports.map((report, index) => {
                      return (
                        <PortalCard
                          key={index}
                          date={report.created_at}
                          type='Reports'
                          tags={['custom']}
                          view={`/portal/reports/${report.pk}`}
                          className={styles.card}
                        >
                          <h4 className='text-lg font-semibold mb-3'>
                            {report?.report_name}
                          </h4>
                        </PortalCard>
                      )
                    })}

                  <PortalCard background={true} className={styles.card}>
                    <h4 className='text-xl text-white font-semibold mb-3'>
                      <Link href='/portal/reports/new/'>
                        Create a New Report
                      </Link>
                    </h4>
                  </PortalCard>
                </>
              ) : (
                <>
                  <PortalCard background={true} className={styles.card}>
                    <h4 className='text-xl text-white font-semibold px-4 mb-2'>
                      Upgrade to Market Research+ to Create a Report
                    </h4>
                    <Button
                      type='tertiary'
                      text='Learn More'
                      size='sm'
                      href='/portal/membership/market-research-upgrade'
                      className='mx-4 mt-4'
                    />
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
              totalCount={!level?.includes('plus') ? 4 : reports?.length + 1}
              pageSize={3}
              onPageChange={(page) => setpage(page)}
            />
          </div>
          <div className='lg:hidden max-w-full'>
            <CardCarousel
              currentPage={page}
              totalCount={!level?.includes('plus') ? 4 : reports?.length + 1}
              pageSize={1}
              onPageChange={(page) => setpage(page)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
