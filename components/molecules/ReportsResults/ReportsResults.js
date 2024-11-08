import DoughnutChart from '@/components/atoms/DoughnutChart'
import HorizontalChart from '@/components/atoms/HorizontalChart'

export default function ReportsResults({
  analysis,
  responses,
  selectedQuestionIds,
}) {
  const { survey } = analysis

  const questions = {}
  selectedQuestionIds.map((id) => {
    questions[id] = {
      name: '',
      responses: {},
    }
  })

  Array.isArray(responses) &&
    responses.map((response) => {
      Object.keys(response.values).map((key) => {
        if (
          key.includes('QID') &&
          selectedQuestionIds.includes(key.split('_')[0])
        ) {
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

  const Reports = ({ name, responses, type }) => {
    if (type === 'sa') {
      return (
        <div className='reports py-4 w-full'>
          <h4 className='text-xl font-semibold text-purple-dark mb-8'>
            {name && name.replace(/<[^>]+>/g, '')}
          </h4>

          <DoughnutChart responses={responses} />
        </div>
      )
    } else if (type === 'ma') {
      return (
        <div className='reports py-4 w-full'>
          <h4 className='text-xl font-semibold text-purple-dark mb-8'>
            {name && name?.replace(/<[^>]+>/g, '')}
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
        <Reports key={index} {...questions[key]} />
      ))}
    </div>
  )
}
