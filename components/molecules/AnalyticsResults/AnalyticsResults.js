import Divider from '@/components/atoms/Divider/Divider'
import DoughnutChart from '@/components/atoms/DoughnutChart'
import HorizontalChart from '@/components/atoms/HorizontalChart'

export default function AnalyticsResults({
  survey,
  responses,
  selectedQuestionIds,
  selectedFirmographics,
}) {
  const questions = {}
  selectedQuestionIds.map((id) => {
    questions[id] = {
      name: '',
      responses: {},
    }
  })

  const fgFilteredResponses = responses.filter((response) => {
    Object.keys(selectedFirmographics).map((key) => {
      if (
        selectedFirmographics[key].length !== 0 &&
        !selectedFirmographics[key].includes(response.values[key])
      ) {
        return false
      }
    })
    return true
  })

  Array.isArray(fgFilteredResponses) &&
    fgFilteredResponses.map((response) => {
      Object.keys(response.values).map((key) => {
        if (
          key.includes('QID') &&
          selectedQuestionIds.includes(key.split('_')[0])
        ) {
          questions[key.split('_')[0]].name =
            survey.result.questions[key.split('_')[0]]?.questionText

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
        <div className='analytics py-4'>
          <h4 className='text-xl font-semibold text-purple-dark mb-8'>
            {name?.replace(/<[^>]+>/g, '')}
          </h4>

          <DoughnutChart responses={responses} />

          <Divider color='purple' />
        </div>
      )
    } else if (type === 'ma') {
      return (
        <div className='analytics py-4'>
          <h4 className='text-xl font-semibold text-purple-dark mb-8'>
            {name.replace(/<[^>]+>/g, '')}
          </h4>

          <HorizontalChart responses={responses} />

          <Divider color='purple' />
        </div>
      )
    }

    return <></>
  }

  return (
    <div className='max-w-3xl mx-auto'>
      {Object.keys(questions).map((key, index) => (
        <Analytics key={index} {...questions[key]} />
      ))}
    </div>
  )
}
