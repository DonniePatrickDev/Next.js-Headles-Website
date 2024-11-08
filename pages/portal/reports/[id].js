import { useRouter } from 'next/router'
import { getReport } from '@/functions/qualtrics/fetchData'
import PortalLayout from '@/components/common/PortalLayout'
import Loading from '@/components/atoms/Loading'
import ReportsView from '@/components/organisms/ReportsView'

export default function Page() {
  const router = useRouter()
  const { id } = router.query

  const { data: report } = getReport(id)

  return (
    <PortalLayout>
      {report ? <ReportsView report={report} /> : <Loading />}
    </PortalLayout>
  )
}
