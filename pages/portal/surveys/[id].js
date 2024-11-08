import { useRouter } from 'next/router'
import { getSurvey } from '@/functions/qualtrics/fetchData'
import PortalLayout from '@/components/common/PortalLayout'
import SurveyForm from '@/components/organisms/SurveyForm'
import { useMemo } from 'react'
import { QualtricsToSurveyjs } from '@/functions/qualtrics/util'

export default function Page() {
  const router = useRouter()
  const { id } = router.query
  const { data } = getSurvey(id)

  const initialData = {}
  if (data) {
    initialData.logoPosition = 'right'
    initialData.pages = []

    const { name, blocks, questions } = data.result

    initialData.title = name.replace(/<[^>]+>/g, '')

    Object.keys(blocks).map((key) => {
      const page = {}
      const block = blocks[key]
      const { description, elements } = block
      page.name = description
      page.elements = []
      elements.map((element) => {
        if (element.type === 'Question') {
          page.elements.push(QualtricsToSurveyjs(questions[element.questionId]))
        }
      })

      initialData.pages.push(page)
    })
  }

  return useMemo(
    () => (
      <PortalLayout>
        <SurveyForm designer={false} initialData={initialData} />
      </PortalLayout>
    ),
    [initialData]
  )
}
