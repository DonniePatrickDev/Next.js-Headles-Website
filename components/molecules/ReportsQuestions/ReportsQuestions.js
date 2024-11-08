import DoughnutChart from '@/components/atoms/DoughnutChart'
import HorizontalChart from '@/components/atoms/HorizontalChart'
import cn from 'classnames'
import styles from './ReportsQuestions.module.scss'

export default function ReportsQuestions({
  analysis,
  responses,
  selectedQuestionIds,
  setSelectedQuestionIds,
}) {
  const { survey } = analysis

  const questionIds = analysis.selectedQuestionIds

  const questions = {}
  questionIds.map((id) => {
    questions[id] = {
      name: '',
      responses: {},
    }
  })

  responses?.length &&
    responses.map((response) => {
      Object.keys(response.values).map((key) => {
        if (key.includes('QID') && questionIds.includes(key.split('_')[0])) {
          questions[key.split('_')[0]].name =
            survey?.result.questions[key.split('_')[0]]?.questionText

          if (key.includes('_TEXT')) {
            questions[key.split('_')[0]].type = 'text'

            if (!Array.isArray(questions[key.split('_')[0]].responses)) {
              questions[key.split('_')[0]].responses = []
            }

            questions[key.split('_')[0]].responses.push(response.values[key])
          } else if (Array.isArray(response.labels[key])) {
            questions[key.split('_')[0]].type = 'ma'

            response.labels[key].map((val) => {
              questions[key.split('_')[0]].responses[val]
                ? questions[key.split('_')[0]].responses[val]++
                : (questions[key.split('_')[0]].responses[val] = 1)
            })
          } else {
            questions[key.split('_')[0]].type = 'sa'

            questions[key.split('_')[0]].responses[response.labels[key]]
              ? questions[key.split('_')[0]].responses[response.labels[key]]++
              : (questions[key.split('_')[0]].responses[
                  response.labels[key]
                ] = 1)
          }
        }
      })
    })

  const Analytics = ({ name, responses, type }) => {
    if (type === 'sa') {
      return (
        <div className='analytics py-4 w-4/5'>
          <h4 className='text-xl font-semibold text-purple-dark mb-8'>
            {name.replace(/<[^>]+>/g, '')}
          </h4>

          <DoughnutChart responses={responses} />
        </div>
      )
    } else if (type === 'ma') {
      return (
        <div className='analytics py-4 w-4/5'>
          <h4 className='text-xl font-semibold text-purple-dark mb-8'>
            {name.replace(/<[^>]+>/g, '')}
          </h4>

          <HorizontalChart responses={responses} />
        </div>
      )
    }

    return <></>
  }

  return (
    <div className='max-w-3xl mx-auto'>
      {Object.keys(questions).map((key, index) => (
        <div
          key={index}
          className={cn(
            styles.question,
            selectedQuestionIds?.includes(key) && styles.active
          )}
          onClick={() =>
            !selectedQuestionIds
              ? setSelectedQuestionIds([key])
              : selectedQuestionIds.includes(key)
              ? setSelectedQuestionIds(
                  selectedQuestionIds.filter((value) => value !== key)
                )
              : setSelectedQuestionIds([...selectedQuestionIds, key])
          }
        >
          <div className={styles.questionCheck}>
            <input
              type='checkbox'
              checked={selectedQuestionIds?.includes(key)}
              readOnly
            />
          </div>

          <Analytics key={index} {...questions[key]} />
        </div>
      ))}
    </div>
  )
}
