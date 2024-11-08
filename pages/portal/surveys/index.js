import PortalLayout from '@/components/common/PortalLayout'
import PortalDashboardSurveys from '@/components/organisms/PortalDashboardSurveys'
import { getSurveys } from '@/functions/qualtrics/fetchData'
import { useSession } from 'next-auth/react'

export default function Page() {
  const { data: session } = useSession()
  const level = session?.membership?.level

  const { data: surveysData } = getSurveys()
  const surveys = surveysData?.result?.elements.filter((survey) => {
    if (!survey.name?.toLowerCase().includes('draft') && survey.isActive) {
      return true
    } else {
      return false
    }
  })

  return (
    <PortalLayout>
      <h1 className='text-purple-dark text-3xl font-bold mb-8'>
        Survey Library
      </h1>

      <PortalDashboardSurveys surveys={surveys} level={level} />
    </PortalLayout>
  )
}
