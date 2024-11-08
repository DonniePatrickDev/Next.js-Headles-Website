import { useEffect, useState } from 'react'
import styles from './ReportsView.module.scss'
import Button from '@/components/atoms/Button'
import Loading from '@/components/atoms/Loading'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import ReportsResults from '@/components/molecules/ReportsResults'
import { getResponses, startResponses } from '@/functions/qualtrics/fetchData'

export default function ReportsView({ report }) {
  const { analysis } = report

  const selectedQuestionIds = report?.data?.selectedQuestionIds

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

    pdf.save(`${report?.data?.selectedAnalysisId}.pdf`)
  }

  return (
    <>
      <h1 className='text-3xl text-center font-bold mb-5'>
        {report?.report_name}
      </h1>

      {analysis?.data && responses?.length ? (
        <ReportsResults
          analysis={analysis}
          responses={responses}
          selectedQuestionIds={selectedQuestionIds}
        />
      ) : (
        <Loading />
      )}

      <div className={styles.nav}>
        <Button type='primary' text='Download' onClick={handleDownload} />
      </div>
    </>
  )
}
