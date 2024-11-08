import { useEffect, useState } from 'react'
import cn from 'classnames'
import {
  getAnalysis,
  getAnalytics,
  getResponses,
  startResponses,
} from '@/functions/qualtrics/fetchData'
import styles from './ReportsNew.module.scss'
import Button from '@/components/atoms/Button'
import Loading from '@/components/atoms/Loading'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useSession } from 'next-auth/react'
import ReportsProjects from '@/components/molecules/ReportsProjects'
import ReportsQuestions from '@/components/molecules/ReportsQuestions'
import ReportsResults from '@/components/molecules/ReportsResults'
import { useRouter } from 'next/router'

export default function ReportsNew() {
  const router = useRouter()
  const { data: session } = useSession()
  const email = session?.email

  const [activeTab, setActiveTab] = useState(1)
  const [reportName, setReportName] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState({ status: '', msg: '' })

  const { data: analytics } = getAnalytics(email)

  const [selectedAnalysisId, setSelectedAnalysisId] = useState('')

  const { data: analysis } = getAnalysis(selectedAnalysisId)

  const [selectedQuestionIds, setSelectedQuestionIds] = useState([])

  /**
   * Get Responses
   */
  const survey = analysis?.data.survey
  const selectedSurveyId = survey?.result?.id

  const [progressId, setProgressId] = useState('')
  const [fileId, setFileId] = useState('')

  const { data: progress } = startResponses(survey?.result?.id)
  useEffect(() => {
    async function processProgress() {
      if (progress?.progressId) {
        setProgressId(progress.progressId)
      }
    }
    processProgress()
  }, [progress])

  const [file, setFile] = useState({})

  let sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  useEffect(() => {
    async function processFile() {
      const fileRes = await fetch(
        `/api/qualtrics/${selectedSurveyId}/progressResponses/${progressId}`
      )
      const fileJson = await fileRes.json()
      if (file.status === 'complete') {
        setFileId(file.fileId)
      } else {
        await sleep(100)
        setFile(fileJson)
      }
    }

    if (selectedSurveyId && progressId && !fileId) {
      processFile()
    }
  }, [file, fileId, selectedSurveyId, progressId])

  const [responses, setResponses] = useState(null)
  const { data: responsesData } = getResponses(selectedSurveyId, fileId)

  useEffect(() => {
    if (responsesData?.responses) {
      setResponses(responsesData.responses)
    }
  }, [responsesData])

  const tabs = [
    {
      id: 1,
      circle: '01',
      text: 'Select Analysis Project',
      body: analytics?.length ? (
        <ReportsProjects
          analytics={analytics}
          selectedAnalysisId={selectedAnalysisId}
          setSelectedAnalysisId={setSelectedAnalysisId}
        />
      ) : (
        <Loading />
      ),
    },
    {
      id: 2,
      circle: '02',
      text: 'Select Questions',
      body:
        analysis?.data && responses?.length ? (
          <ReportsQuestions
            analysis={analysis?.data}
            responses={responses}
            selectedQuestionIds={selectedQuestionIds}
            setSelectedQuestionIds={setSelectedQuestionIds}
          />
        ) : (
          <Loading />
        ),
    },
    {
      id: 3,
      circle: '03',
      text: 'Save & Download Report',
      body:
        analysis?.data && selectedQuestionIds && responses?.length ? (
          <ReportsResults
            analysis={analysis?.data}
            responses={responses}
            selectedQuestionIds={selectedQuestionIds}
            setSelectedQuestionIds={setSelectedQuestionIds}
          />
        ) : (
          <Loading />
        ),
    },
  ]

  async function handleDownload() {
    const pdfSources = window.document.getElementsByClassName('reports')
    const pdf = new jsPDF('l', 'pt')

    await Promise.all(
      Array.from(pdfSources).map(async (pdfSource) => {
        const pdfCanvas = await html2canvas(pdfSource)

        const img = pdfCanvas.toDataURL('image/png')

        pdf.addImage(
          img,
          'png',
          40,
          50,
          pdfSource.offsetWidth,
          pdfSource.offsetHeight
        )

        pdf.addPage()
      })
    )

    pdf.save(`${selectedAnalysisId}.pdf`)
  }

  async function handleSave(reportName) {
    setSaving(true)
    setSaveStatus({
      status: '',
      msg: '',
    })

    try {
      const res = await fetch('https://backend.dhanalytics.org/api/reports/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          analysis: selectedAnalysisId,
          report_name: reportName,
          data: {
            selectedAnalysisId: selectedAnalysisId,
            selectedQuestionIds: selectedQuestionIds,
          },
        }),
      })

      if (res.status === 201) {
        setSaving(false)
        setSaveStatus({
          status: 'success',
          msg: 'Your Report has been saved successfully',
        })
        router.push('/portal/reports/')
      } else {
        setSaving(false)
        setSaveStatus({
          status: 'error',
          msg: 'Internal server error. Please try again',
        })
      }
    } catch (error) {
      setSaving(false)
      setSaveStatus({
        status: 'error',
        msg: 'Internal server error. Please try again',
      })
    }
  }

  return (
    <>
      <div className={styles.tabs}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={cn(styles.tab, activeTab === tab.id && styles.active)}
          >
            <div className={styles.cicle}>{tab.circle}</div>
            <div className={styles.text}>{tab.text}</div>
          </div>
        ))}
      </div>

      <div className={styles.body}>
        {tabs.map((tab, index) => (
          <div className={activeTab === tab.id ? '' : 'hidden'} key={index}>
            {tab.body}
          </div>
        ))}
      </div>

      {activeTab === 3 && (
        <div className={styles.nav}>
          <input
            type='text'
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
            placeholder='Project Name'
            className='rounded m-4 w-64'
          />
        </div>
      )}

      <div className={styles.nav}>
        <Button
          type='primary'
          text='Previous'
          onClick={() => setActiveTab(activeTab - 1)}
          disabled={activeTab === 1}
        />

        {activeTab !== 3 && (
          <Button
            type='primary'
            text='Next'
            onClick={() => setActiveTab(activeTab + 1)}
          />
        )}

        {activeTab === 3 && (
          <>
            <Button type='primary' text='Download' onClick={handleDownload} />

            <Button
              type='primary'
              text='Save'
              onClick={() => handleSave(reportName)}
              disabled={saving}
            />
          </>
        )}
      </div>

      {saveStatus.status === 'error' && (
        <p className='text-red text-right mt-3'>{saveStatus.msg}</p>
      )}

      {saveStatus.status === 'success' && (
        <p className='text-purple text-right mt-3'>{saveStatus.msg}</p>
      )}
    </>
  )
}
