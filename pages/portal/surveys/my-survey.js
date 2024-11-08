import PortalLayout from '@/components/common/PortalLayout'
import MySurveys from '@/components/organisms/MySurveys'
import { getMySurveys } from '@/functions/qualtrics/fetchData'
import { useSession } from 'next-auth/react'

export default function Page() {
  const { data: session } = useSession()
  const email = session?.email
  const level = session?.membership?.level

  const { data: surveys } = getMySurveys(email)

  return (
    <PortalLayout>
      <h1 className='text-purple-dark text-3xl font-bold mb-8'>My Surveys</h1>

      {surveys && <MySurveys surveys={surveys} level={level} />}
    </PortalLayout>
  )
}
