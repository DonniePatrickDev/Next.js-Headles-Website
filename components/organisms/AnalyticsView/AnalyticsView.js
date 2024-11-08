import { useEffect, useState } from 'react'
import AnalyticsResults from '@/components/molecules/AnalyticsResults'
import {
  getResponses,
  getSurvey,
  startResponses,
} from '@/functions/qualtrics/fetchData'
import styles from './AnalyticsView.module.scss'
import Loading from '@/components/atoms/Loading'

export default function AnalyticsView({ analysis }) {
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

  const [responses, setResponses] = useState(null)
  const { data: responsesData } = getResponses(selectedSurveyId, fileId)

  useEffect(() => {
    if (responsesData?.responses) {
      setResponses(responsesData.responses)
    }
  }, [responsesData])

  const [selectedFirmographics, setSelectedFirmographics] = useState({})

  useEffect(() => {
    setSelectedSurveyId(analysis.data?.survey?.result?.id)
    setSelectedQuestionIds(analysis.data?.selectedQuestionIds)
    setSelectedFirmographics(analysis.data?.selectedFirmographics)
  }, [analysis])

  return (
    <>
      <div className={styles.body}>
        <h1 className='mb-12 text-3xl text-center font-bold'>
          {analysis?.analysis_name}
        </h1>

        {survey && responses && selectedQuestionIds && selectedFirmographics ? (
          <AnalyticsResults
            survey={survey}
            responses={responses}
            selectedQuestionIds={selectedQuestionIds}
            selectedFirmographics={selectedFirmographics}
          />
        ) : (
          <Loading />
        )}
      </div>
    </>
  )
}
