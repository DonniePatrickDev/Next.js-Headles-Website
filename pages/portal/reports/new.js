import Loading from '@/components/atoms/Loading'
import PortalLayout from '@/components/common/PortalLayout'
import PortalCard from '@/components/molecules/PortalCard'
import ReportsNew from '@/components/organisms/ReportsNew'
import { getReports } from '@/functions/qualtrics/fetchData'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  const { data: session } = useSession()
  const email = session?.email
  const level = session?.membership?.level

  const { data: reports } = getReports(email)

  if (level === 'market-research') {
    router.push('/portal/membership/market-research-upgrade')
  }

  if (session && level !== 'market-research') {
    return (
      <PortalLayout>
        <h1 className='text-xl font-bold text-purple-dark uppercase mb-4'>
          Create Report
        </h1>

        {reports?.length > 2 && !level?.includes('plus') ? (
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
          <ReportsNew />
        )}
      </PortalLayout>
    )
  }

  return <Loading />
}
