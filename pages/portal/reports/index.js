import PortalLayout from '@/components/common/PortalLayout'
import PortalDashboardReports from '@/components/organisms/PortalDashboardReports'
import { getReports } from '@/functions/qualtrics/fetchData'
import { useSession } from 'next-auth/react'

export default function Page() {
  const { data: session } = useSession()
  const email = session?.email
  const level = session?.membership?.level

  const { data: reports } = getReports(email)

  return (
    <PortalLayout>
      <h1 className='text-purple-dark text-3xl font-bold mb-8'>My Reports</h1>

      {reports && <PortalDashboardReports reports={reports} level={level} />}
    </PortalLayout>
  )
}
