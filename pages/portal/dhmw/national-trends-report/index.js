import Loading from '@/components/atoms/Loading'
import PortalLayout from '@/components/common/PortalLayout'
import PortalDashboardDHMWReports from '@/components/organisms/PortalDashboardDHMWReports'
import { getResults } from '@/functions/qualtrics/fetchData'
import { useSession } from 'next-auth/react'

export default function Page() {
  const { data: session } = useSession()
  const email = session?.email
  const level = session?.membership?.level

  const { data: reports } = getResults(email)

  return (
    <PortalLayout>
      <h1 className='text-purple-dark text-3xl font-bold text-center mb-8'>
        National Trends Reports
      </h1>

      {reports ? (
        <PortalDashboardDHMWReports
          reports={reports[0]}
          level={level}
          showMy={false}
          showNational={true}
        />
      ) : (
        <Loading />
      )}
    </PortalLayout>
  )
}
