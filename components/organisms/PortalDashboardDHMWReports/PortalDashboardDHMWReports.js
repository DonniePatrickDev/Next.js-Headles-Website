import CardCarousel from '@/components/molecules/CardCarousel'
import PortalCard from '@/components/molecules/PortalCard'
import { useState } from 'react'
import cn from 'classnames'
import styles from './PortalDashboardDHMWReports.module.scss'
import Link from 'next/link'
import Button from '@/components/atoms/Button'

export default function PortalDashboardDHMWReports({
  reports,
  title,
  subtitle,
  carousel,
  level,
  showMy,
  showNational,
}) {
  const [page, setpage] = useState(1)

  return (
    <div className='mb-12'>
      {title && <h4 className='text-lg font-semibold text-gray'>{title}</h4>}

      {subtitle && <p className='text-lg text-gray mb-5'>{subtitle}</p>}

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
          {showNational && (
            <>
              <PortalCard
                download='https://dhix.dhinsights.org/wp-content/uploads/2022/03/Digital-Health-Most-Wired_National-Trends-2021.pdf'
                className={styles.card}
              >
                <h4 className='text-lg font-semibold mb-3 capitalize'>
                  2021 National Trends Report
                </h4>

                <p>
                  The COVID-19 virus has tried the healthcare system in
                  innumerable ways. Despite these challenges, healthcare
                  employees, organizations and vendors have fought back and
                  continue to fight against this global pandemic. HealthCare’s
                  Most Wired research strives to evolve and push technology
                  standards to better support healthcare organizations, thereby
                  improving care delivery and enhancing the patient
                  experience—during and beyond the pandemic.
                </p>
              </PortalCard>

              <PortalCard background={true} className={styles.card}>
                <h4 className='text-xl text-white font-semibold mb-3'>
                  <a
                    href='https://digitalhealthmw.co1.qualtrics.com/jfe/form/SV_0HrVnrjxPCkvlJA'
                    target='_blank'
                    rel='noreferrer'
                  >
                    Start Your Digital Health Most Wired Survey
                  </a>
                </h4>
              </PortalCard>

              <PortalCard
                download='https://dhix.dhinsights.org/wp-content/uploads/2022/03/Digital-Health-Most-Wired_National-Trends-2020.pdf'
                className={styles.card}
              >
                <h4 className='text-lg font-semibold mb-3 capitalize'>
                  2020 National Trends Report
                </h4>

                <p>
                  In 2020, the COVID-19 pandemic forced the accelerated
                  deployment of healthcare technology and strategies and
                  increased the importance of continued innovation. Healthcare
                  organizations rose to the challenge, expanding adoption of
                  supportive technologies in key areas such as patient
                  engagement and population health management. This report
                  explores these and other national trends uncovered in the 2020
                  Most Wired research.
                </p>
              </PortalCard>
            </>
          )}

          {!level?.includes('market-research') && (
            <PortalCard background={true} className={styles.card}>
              <h4 className='text-xl text-white font-semibold mb-3'>
                <Link href='/portal/reports/new/'>
                  Access insight reports from the most recent Digital Health
                  Most Wired survey, including the National Trends Report.
                </Link>
              </h4>
            </PortalCard>
          )}

          {showMy &&
            reports &&
            Object.keys(reports).map(
              (key, index) =>
                (key === 'acute' || key === 'ambulatory' || key === 'ltpac') &&
                reports[key] && (
                  <PortalCard
                    key={index}
                    download={reports[key]}
                    className={styles.card}
                  >
                    <h4 className='text-lg font-semibold mb-3 capitalize'>
                      {key === 'ltpac' ? 'LTPAC' : key}
                    </h4>

                    <p>
                      {key === 'acute'
                        ? 'Your latest Digital Health Most Wired Acute survey assessment. This survey measures how effectively healthcare organizations apply core and advanced technologies into their clinical and business programs to improve health care in their communities.'
                        : key === 'ambulatory'
                        ? 'Your latest Digital Health Most Wired Ambulatory survey assessment. This survey measures how effectively healthcare organizations apply core and advanced technologies into their clinical and business programs to improve health care in their communities.'
                        : 'Your latest Digital Health Most Wired LTPAC survey assessment. This survey measures how effectively healthcare organizations apply core and advanced technologies into their clinical and business programs to improve health care in their communities.'}
                    </p>
                  </PortalCard>
                )
            )}

          {level === 'market-research' && (
            <PortalCard background={true} className={styles.card}>
              <h4 className='text-xl text-white font-semibold px-4 mb-2'>
                Upgrade to Market Research+ to Download More Reports
              </h4>
              <Button
                type='tertiary'
                text='Learn More'
                size='sm'
                href='/portal/membership/market-research-upgrade'
                className='mx-4'
              />
            </PortalCard>
          )}
        </div>
      </div>

      {carousel && (
        <div className='flex justify-end py-4'>
          <div className='hidden lg:block'>
            <CardCarousel
              currentPage={page}
              totalCount={5}
              pageSize={3}
              onPageChange={(page) => setpage(page)}
            />
          </div>

          <div className='lg:hidden max-w-full'>
            <CardCarousel
              currentPage={page}
              totalCount={5}
              pageSize={1}
              onPageChange={(page) => setpage(page)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
