import { useEffect, useState } from 'react'
import cn from 'classnames'
import AnalyticsFirmographics from '@/components/molecules/AnalyticsFirmographics'
import AnalyticsProjects from '@/components/molecules/AnalyticsProjects'
import AnalyticsQuestions from '@/components/molecules/AnalyticsQuestions'
import AnalyticsResults from '@/components/molecules/AnalyticsResults'
import {
  getResponses,
  getSurvey,
  getSurveys,
  startResponses,
} from '@/functions/qualtrics/fetchData'
import styles from './AnalyticsNew.module.scss'
import Button from '@/components/atoms/Button'
import Loading from '@/components/atoms/Loading'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function AnalyticsNew() {
  const router = useRouter()
  const { data: session } = useSession()

  const [activeTab, setActiveTab] = useState(1)
  const [analyticsName, setAnalyticsName] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState({ status: '', msg: '' })

  const { data: surveysData } = getSurveys()
  const surveys = surveysData?.result?.elements?.filter((survey) => {
    if (
      !survey.name?.toLowerCase().includes('draft') &&
      !survey.name?.toLowerCase().includes('peer') &&
      !survey.name?.toLowerCase().includes('industry') &&
      survey.name?.toLowerCase().includes('dataset') &&
      survey.isActive
    ) {
      return true
    } else {
      return false
    }
  })

  const [selectedSurveyId, setSelectedSurveyId] = useState('')

  const { data: survey } = getSurvey(selectedSurveyId)
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([])

  /**
   * Get Responses
   */
  const [progressId, setProgressId] = useState('')
  const [fileId, setFileId] = useState('')

  const { data: progress } = startResponses(selectedSurveyId)
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

  const [responses, setResponses] = useState([])
  const { data: responsesData } = getResponses(selectedSurveyId, fileId)

  useEffect(() => {
    if (responsesData?.responses) {
      setResponses(responsesData.responses)
    }
  }, [responsesData])

  /**
   * Select Firmographics
   */
  const [selectedFirmographics, setSelectedFirmographics] = useState({})

  const tabs = [
    {
      id: 1,
      circle: '01',
      text: 'Select Project',
      body: surveys ? (
        <AnalyticsProjects
          surveys={surveys}
          selectedSurveyId={selectedSurveyId}
          setSelectedSurveyId={setSelectedSurveyId}
        />
      ) : (
        <Loading />
      ),
    },
    {
      id: 2,
      circle: '02',
      text: 'Select Questions',
      body: survey ? (
        <AnalyticsQuestions
          survey={survey}
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
      text: 'Select Firmographics',
      body:
        survey && responses?.length ? (
          <AnalyticsFirmographics
            survey={survey}
            responses={responses}
            selectedFirmographics={selectedFirmographics}
            setSelectedFirmographics={setSelectedFirmographics}
          />
        ) : (
          <Loading />
        ),
    },
    {
      id: 4,
      circle: '04',
      text: 'View Results',
      body:
        survey && responses && selectedQuestionIds && selectedFirmographics ? (
          <AnalyticsResults
            survey={survey}
            responses={responses}
            selectedQuestionIds={selectedQuestionIds}
            selectedFirmographics={selectedFirmographics}
          />
        ) : (
          <Loading />
        ),
    },
  ]

  async function handleDownload() {
    const pdfSources = window.document.getElementsByClassName('analytics')

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

    pdf.save(`${survey.result.name}.pdf`)
  }

  async function handleSave(analyticsName) {
    setSaving(true)
    setSaveStatus({
      status: '',
      msg: '',
    })

    try {
      const res = await fetch(
        'https://backend.dhanalytics.org/api/analytics/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: session?.email,
            analysis_name: analyticsName,
            data: {
              survey: survey,
              selectedQuestionIds: selectedQuestionIds,
              selectedFirmographics: selectedFirmographics,
            },
          }),
        }
      )

      if (res.status === 201) {
        setSaving(false)
        setSaveStatus({
          status: 'success',
          msg: 'Your Report has been saved successfully',
        })
        router.push('/portal/analytics/')
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

      {activeTab === 4 && (
        <div className={styles.nav}>
          <input
            type='text'
            value={analyticsName}
            onChange={(e) => setAnalyticsName(e.target.value)}
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

        {activeTab !== 4 && (
          <Button
            type='primary'
            text='Next'
            onClick={() => setActiveTab(activeTab + 1)}
          />
        )}

        {activeTab === 4 && (
          <>
            <Button type='primary' text='Download' onClick={handleDownload} />

            <Button
              type='primary'
              text='Save'
              onClick={() => handleSave(analyticsName)}
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
