import PortalLayout from '@/components/common/PortalLayout'
import PortalDashboardDHMWReports from '@/components/organisms/PortalDashboardDHMWReports'
import { getPortalSettings } from '@/functions/wordpress/fetchData'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Page() {
  const { data: session } = useSession()
  const level = session?.membership?.level

  const { data: reports } = getPortalSettings()

  const [DHMWReports, setDHMWReports] = useState([])

  useEffect(() => {
    const reportArray = []
    if (reports?.acf?.digital_health_most_wired_report?.report) {
      reports.acf.digital_health_most_wired_report?.report.forEach(
        (report, index) => {
          reportArray.push({
            ...report,
            link: `/portal/dhmw/digital-health-most-wired-report/${index}`,
          })
        }
      )
    }

    setDHMWReports(reportArray)

    return () => {
      setDHMWReports([])
    }
  }, [reports])

  return (
    <PortalLayout>
      <h1 className='text-purple-dark text-3xl font-bold text-center mb-8'>
        Digital Health Most Wired Reports
      </h1>

      <PortalDashboardDHMWReports reports={DHMWReports} level={level} />
    </PortalLayout>
  )
}
