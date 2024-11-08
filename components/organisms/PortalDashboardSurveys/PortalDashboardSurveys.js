import Button from '@/components/atoms/Button'
import PortalCard from '@/components/molecules/PortalCard'
import Link from 'next/link'
import styles from './PortalDashboardSurveys.module.scss'

export default function PortalDashboardSurveys({
  title,
  subtitle,
  peerSurveys,
  industrySurveys,
  pulseSurveys,
  membershipCard,
  surveys,
  level,
  mySurveyNum,
}) {
  return (
    <div className='mb-12'>
      {title && <h4 className='text-lg font-semibold text-gray'>{title}</h4>}

      {subtitle && (
        <p className='text-lg text-gray mb-5'>
          {level === 'market-research'
            ? 'Upgrade to Market Research+ to create up to 2 Pulse and 1 Market Research surveys during your subscription period.'
            : subtitle}
        </p>
      )}

      <div className='overflow-hidden'>
        <div className='flex flex-row flex-wrap gap-6 ease-in-out transition duration-200'>
          {level !== 'market-research' ? (
            <>
              {!level?.includes('market-research') && peerSurveys && (
                <PortalCard className={styles.card}>
                  <h5 className='text-sm font-semibold mb-3'>
                    Surveys From Your Peers
                  </h5>

                  <div className='p-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400'>
                    {peerSurveys.map((survey, index) => (
                      <Link href={`/portal/surveys/${survey.id}`} key={index}>
                        <a className='block text-purple-dark mb-2'>
                          {survey.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </PortalCard>
              )}

              {!level?.includes('market-research') && industrySurveys && (
                <PortalCard className={styles.card}>
                  <h5 className='text-sm font-semibold mb-3'>
                    Surveys From The Industry
                  </h5>

                  <div className='p-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400'>
                    {industrySurveys.map((survey, index) => (
                      <Link href={`/portal/surveys/${survey.id}`} key={index}>
                        <a className='block text-purple-dark mb-2'>
                          {survey.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </PortalCard>
              )}

              {level?.includes('market-research') && pulseSurveys && (
                <PortalCard className={styles.card}>
                  <h5 className='text-sm font-semibold mb-3'>
                    My Pulse Studies
                  </h5>

                  <div className='p-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400'>
                    {pulseSurveys.map((survey, index) => (
                      <Link href={`/portal/surveys/${survey.id}`} key={index}>
                        <a className='block text-purple-dark mb-2'>
                          {survey.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </PortalCard>
              )}

              {level?.includes('market-research') && industrySurveys && (
                <PortalCard className={styles.card}>
                  <h5 className='text-sm font-semibold mb-3'>
                    Provider Surveys
                  </h5>

                  <div className='p-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400'>
                    {industrySurveys.map((survey, index) => (
                      <Link href={`/portal/surveys/${survey.id}`} key={index}>
                        <a className='block text-purple-dark mb-2'>
                          {survey.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </PortalCard>
              )}

              {membershipCard && (
                <>
                  {!level?.includes('plus') && mySurveyNum > 2 ? (
                    <PortalCard background={true} className={styles.card}>
                      <h4 className='text-xl text-white font-semibold px-4'>
                        Create Surveys with
                      </h4>
                      <h3 className='text-4xl text-white font-semibold px-4 mb-2'>
                        Provider+
                      </h3>
                      <Button
                        type='tertiary'
                        text='Learn More'
                        size='sm'
                        href='/portal/membership/provider-upgrade'
                        className='mx-4'
                      />
                    </PortalCard>
                  ) : (
                    <PortalCard background={true} className={styles.card}>
                      <h4 className='text-xl text-white font-semibold mb-3'>
                        <Link href='/portal/surveys/new/'>Create A Survey</Link>
                      </h4>
                    </PortalCard>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <PortalCard background={true} className={styles.card}>
                <h4 className='text-xl text-white font-semibold px-4 mb-2'>
                  Upgrade to Market Research+ to Create a Survey
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

          {level !== 'market-research' && (
            <>
              {surveys &&
                surveys.map((survey, index) => (
                  <PortalCard
                    date={survey.creationDate}
                    type='Survey'
                    tags={[survey.isActive ? 'Enabled' : 'New']}
                    view={`/portal/surveys/${survey.id}`}
                    className={styles.card}
                    key={index}
                  >
                    <h4 className='text-lg font-semibold mb-3'>
                      {survey.name}
                    </h4>
                  </PortalCard>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
