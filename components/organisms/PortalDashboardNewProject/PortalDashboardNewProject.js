import PortalCard from '@/components/molecules/PortalCard'
import Link from 'next/link'
import styles from './PortalDashboardNewProject.module.scss'

export default function PortalDashboardNewProject() {
  return (
    <div className='mb-12'>
      <h1 className='text-2xl text-center text-purple-dark mb-16 font-bold'>
        Start a New Projects
      </h1>

      <div className='overflow-hidden'>
        <div className='flex flex-row gap-6'>
          <PortalCard background={true} className={styles.card}>
            <h4 className='text-xl text-white font-semibold mb-3'>
              <Link href='/portal/surveys/new/'>Create a Survey</Link>
            </h4>
          </PortalCard>

          <PortalCard background={true} className={styles.card}>
            <h4 className='text-xl text-white font-semibold mb-3'>
              <Link href='/portal/analytics/new/'>Run a Analytics Query</Link>
            </h4>
          </PortalCard>

          <PortalCard background={true} className={styles.card}>
            <h4 className='text-xl text-white font-semibold mb-3'>
              <Link href='/portal/reports/new/'>Create a Report</Link>
            </h4>
          </PortalCard>
        </div>
      </div>
    </div>
  )
}
