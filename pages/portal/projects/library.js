import PortalLayout from '@/components/common/PortalLayout'
import PortalDashboardProjects from '@/components/organisms/PortalDashboardProjects'
import {
  getAnalytics,
  getMySurveys,
  getReports,
} from '@/functions/qualtrics/fetchData'
import { useSession } from 'next-auth/react'

export default function Page() {
  const { data: session } = useSession()
  const email = session?.email

  const { data: myReports } = getReports(email)
  const { data: mySurveys } = getMySurveys(email)
  const { data: analytics } = getAnalytics(email)

  return (
    <PortalLayout>
      <h1 className='text-purple-dark text-3xl font-bold mb-8'>
        Project Library
      </h1>

      {analytics && myReports && mySurveys && (
        <PortalDashboardProjects
          analytics={analytics}
          reports={myReports}
          surveys={mySurveys}
        />
      )}
    </PortalLayout>
  )
}
