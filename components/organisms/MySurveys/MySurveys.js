import Button from '@/components/atoms/Button'
import PortalCard from '@/components/molecules/PortalCard'
import cn from 'classnames'
import styles from './MySurveys.module.scss'

export default function MySurveys({ surveys, level }) {
  return (
    <div className='flex flex-row flex-wrap gap-6 ease-in-out transition duration-200'>
      {level === 'market-research' ? (
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
      ) : level?.includes('plus') ? (
        <>
          {surveys.map((survey, index) => (
            <PortalCard
              key={index}
              date={survey.created_at}
              type='Survey'
              tags={[survey.survey_id ? 'Active' : 'Pending']}
              view={
                survey.survey_id ? `/portal/surveys/${survey.survey_id}` : null
              }
              className={styles.card}
            >
              <h4 className='text-lg font-semibold mb-3'>
                {survey.data?.title}
              </h4>
            </PortalCard>
          ))}
        </>
      ) : (
        <>
          {surveys.slice(0, 3).map((survey, index) => (
            <PortalCard
              key={index}
              date={survey.created_at}
              type='Survey'
              tags={[survey.survey_id ? 'Active' : 'Pending']}
              view={
                survey.survey_id ? `/portal/surveys/${survey.survey_id}` : null
              }
              className={styles.card}
            >
              <h4 className='text-lg font-semibold mb-3'>
                {survey.data?.title ? survey.data?.title : 'No Name defined'}
              </h4>
            </PortalCard>
          ))}

          {surveys.length > 2 && (
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
          )}
        </>
      )}
    </div>
  )
}
