import PortalLayout from '@/components/common/PortalLayout'
import { getPortalSettings } from '@/functions/wordpress/fetchData'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

export default function Page() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  const router = useRouter()
  const { id } = router.query

  const { data } = getPortalSettings()

  const [reports, setReports] = useState([])

  useEffect(() => {
    data?.acf && setReports(data.acf.digital_health_most_wired_report?.report)

    return () => {
      setReports([])
    }
  }, [data])

  return (
    <PortalLayout>
      <div className='relative'>
        <div className='flex flex-col lg:flex-row justify-between items-center mb-8'>
          <h1 className='text-2xl text-purple-dark font-bold mb-4 lg:mb-0 text-center lg:text-left'>
            Digital Health Most Wired Report
          </h1>

          <div className='flex gap-4'>
            <select
              defaultValue={id}
              onChange={(e) =>
                router.push(
                  `/portal/dhmw/digital-health-most-wired-report/${e.target.value}`
                )
              }
              className='rounded'
            >
              {reports.map((report, index) => (
                <option value={index} key={index}>
                  {report.name}
                </option>
              ))}
            </select>

            {reports[id]?.pdf && (
              <a
                href={reports[id]?.pdf}
                target='_blank'
                rel='noreferrer'
                className='text-lg text-white bg-purple-dark hover:bg-purple border rounded-full px-8 py-2'
              >
                Download
              </a>
            )}
          </div>
        </div>

        <div className=''>
          {reports[id]?.pdf && (
            <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.2.228/build/pdf.worker.js'>
              <div style={{ height: '750px' }}>
                <Viewer
                  fileUrl={reports[id]?.pdf}
                  plugins={[defaultLayoutPluginInstance]}
                />
              </div>
            </Worker>
          )}
        </div>
      </div>
    </PortalLayout>
  )
}
