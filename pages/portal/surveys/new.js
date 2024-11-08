import Loading from '@/components/atoms/Loading'
import PortalLayout from '@/components/common/PortalLayout'
import PortalCard from '@/components/molecules/PortalCard'
import SurveyForm from '@/components/organisms/SurveyForm'
import { getMySurveys } from '@/functions/qualtrics/fetchData'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Page() {
  const router = useRouter()

  const { data: session } = useSession()
  const level = session?.membership?.level

  const { data: surveysData } = getMySurveys()

  const [surveys, setSurveys] = useState(null)
  useEffect(() => {
    session?.email &&
      surveysData?.length &&
      setSurveys(
        surveysData.filter((survey) => {
          return survey.email === session?.email
        })
      )
  }, [session, surveysData])

  if (level === 'market-research') {
    router.push('/portal/membership/market-research-upgrade')
  }

  if (session && level !== 'market-research') {
    return (
      <PortalLayout>
        <h1 className='text-xl font-bold text-purple-dark uppercase mb-4'>
          Create Survey
        </h1>

        {surveys?.length > 2 && !level?.includes('plus') ? (
          <PortalCard background={true} className='max-w-md flex items-center'>
            <h4 className='text-xl text-white font-semibold mb-3'>
              <Link
                href={
                  level === 'provider'
                    ? '/portal/membership/provider-upgrade'
                    : '/portal/membership/market-research-upgrade'
                }
              >
                Upgrade to Provider+ to Run More Queries
              </Link>
            </h4>
          </PortalCard>
        ) : (
          <SurveyForm
            designer={true}
            initialData={{
              logoPosition: 'right',
              pages: [
                {
                  name: 'page1',
                  elements: [
                    {
                      type: 'text',
                      name: 'question1',
                    },
                  ],
                },
              ],
            }}
          />
        )}
      </PortalLayout>
    )
  }

  return <Loading />
}
