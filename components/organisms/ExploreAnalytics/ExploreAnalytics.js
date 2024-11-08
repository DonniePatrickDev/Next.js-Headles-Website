import IconCard from '@/components/molecules/IconCard'
import styles from './ExploreAnalytics.module.scss'

export default function ExploreAnalytics() {
  return (
    <div className={styles.root}>
      <h2 className='text-xl text-purple-dark font-bold uppercase text-center mb-6'>
        Explore Analytics
      </h2>

      <div className='grid md:grid-cols-3 gap-6'>
        <IconCard
          type={3}
          image={{
            src: 'analytics_thumb_1',
            width: 372,
            height: 74,
            alt: 'Analytics Thumb',
          }}
          icon={{
            src: 'circle',
            size: 40,
          }}
          title='Unique Insights'
          text='Get access to data from one of the most trusted courses in healthcare.'
          href='/dha-access-is-coming-soon'
        />

        <IconCard
          type={3}
          image={{
            src: 'analytics_thumb_2',
            width: 372,
            height: 74,
            alt: 'Analytics Thumb',
          }}
          icon={{
            src: 'draw',
            size: 40,
          }}
          title='Find Answers'
          text='Leverage powerful survey and polling capabilities and tools.'
          href='/dha-access-is-coming-soon'
        />

        <IconCard
          type={3}
          image={{
            src: 'analytics_thumb_3',
            width: 372,
            height: 74,
            alt: 'Analytics Thumb',
          }}
          icon={{
            src: 'art',
            size: 40,
          }}
          title='Advanced Diagnostics'
          text='Want to take your data to the next level?'
          href='/dha-access-is-coming-soon'
        />
      </div>
    </div>
  )
}
