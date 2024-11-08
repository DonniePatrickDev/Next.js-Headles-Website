import PortalLayout from '@/components/common/PortalLayout'
import PortalDashboardAnalytics from '@/components/organisms/PortalDashboardAnalytics'
import { getAnalytics } from '@/functions/qualtrics/fetchData'
import { useSession } from 'next-auth/react'

export default function Page() {
  const { data: session } = useSession()
  const eamil = session?.email
  const level = session?.membership?.level

  const { data: analytics } = getAnalytics(eamil)

  return (
    <PortalLayout>
      <h1 className='text-purple-dark text-3xl font-bold mb-8'>My Analytics</h1>

      {analytics && (
        <PortalDashboardAnalytics analytics={analytics} level={level} />
      )}
    </PortalLayout>
  )
}
