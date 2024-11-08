import { useRouter } from 'next/router'
import { getAnalysis } from '@/functions/qualtrics/fetchData'
import PortalLayout from '@/components/common/PortalLayout'
import AnalyticsView from '@/components/organisms/AnalyticsView'
import Loading from '@/components/atoms/Loading'

export default function Page() {
  const router = useRouter()
  const { id } = router.query

  const { data: analysis } = getAnalysis(id)

  return (
    <PortalLayout>
      {analysis ? <AnalyticsView analysis={analysis} /> : <Loading />}
    </PortalLayout>
  )
}
