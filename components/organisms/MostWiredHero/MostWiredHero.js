import Background from '@/components/atoms/Background'
import Breadcrumbs from '@/components/atoms/Breadcrumbs'
import Button from '@/components/atoms/Button'
import Image from '@/components/atoms/Image'
import IconCard from '@/components/molecules/IconCard'
import styles from './MostWiredHero.module.scss'

export default function MostWiredHero({ breadcrumbs }) {
  return (
    <div className={styles.root}>
      <div className={styles.bgWrap}>
        <Background image='most_wired_hero' />
      </div>

      <Breadcrumbs breadcrumbs={breadcrumbs} color='white' />

      <div className={styles.inner}>
        <div>
          <h1 className={styles.title}>Digital Health Analytics</h1>
          <p className={styles.text}>
            Welcome to Digital Health Analytics (DHA), a global market
            intelligence and survey research hub for digital health technology.
            Provided by the College of Healthcare Information Management
            Executives (CHIME), DHA was created in 2022 to supercharge your
            digital health transformation capabilities by moving from a one
            snapshot in time static Most Wired survey to a 365/24/7 data and
            analytics resource. Digital Health Analytics is the gateway for
            provider organizations and companies to better understand how
            digital technology supports leaders in transforming health and care
            and delivering data insights that help them make the greatest
            business impact possible.
          </p>
        </div>

        <div className='bg-black p-8 text-center'>
          <Image
            src='dha_logo_bold_dark'
            width={176}
            height={85}
            alt='DHX Analytics'
            className='mb-4'
          />

          <h3 className='text-2xl text-white font-bold mb-6'>
            Most Wired Participants.
          </h3>

          <Button
            text='Log into the DHA Portal'
            type='tertiary'
            href='/portal'
            size='lg'
            background='purple'
            weight='medium'
            className='mb-4'
          />

          <p className={styles.text}>
            Provider members who have previously participated in the Digital
            Health Most Wired Survey receive complimentary access to our
            Provider portal. Please access the portal here with your
            organization-specific credentials. Please contact the DHA team if
            you have access questions
          </p>
        </div>

        <IconCard
          type={4}
          image={{
            src: 'most_wired_thumb1',
            width: 568,
            height: 188,
            alt: 'For Vendors',
          }}
          icon={{
            src: 'man_solid',
            size: 40,
          }}
          title='For Vendors'
          text='Gain exclusive access to market intelligence via custom queries into our database and the creation of your own surveys to our audience of digital health leaders.  '
          href='/portal?commercial=true'
          button='I Am A Commercial Partner'
          className='rounded'
        />

        <IconCard
          type={4}
          image={{
            src: 'most_wired_thumb2',
            width: 568,
            height: 188,
            alt: 'For Vendors',
          }}
          icon={{
            src: 'panel',
            size: 40,
          }}
          title='Provider Access'
          text='Analyze your DHMW data against your peers via queries and custom surveys to gain valuable benchmarking insights into best practices, HIT adoption patterns, and market trends related to HIT. '
          subtext='Providers who have not previously participated in the Digital Health Most Wired Survey can register for access here.'
          href='/portal/register'
          button='I Am A New Provider Partner'
          className='rounded'
        />
      </div>
    </div>
  )
}
