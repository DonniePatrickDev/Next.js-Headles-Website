export function QualtricsToSurveyjs(q) {
  const question = {
    name: q.questionName,
    title: q.questionText.replace(/<[^>]+>/g, ''),
  }

  switch (q.questionType.type) {
    case 'TE':
      question.type = 'text'

      if (q.questionType.selector === 'ML') {
        question.type = 'comment'
      }

      if (q.questionType.selector === 'FORM') {
        question.type = 'multipletext'
        question.items = []
        q.choices &&
          Object.keys(q.choices).map((key) => {
            question.items.push({
              name: key,
              title: q.choices[key].choiceText,
            })
          })
      }
      break

    case 'DB':
      question.type = 'expression'

      if (q.questionType.selector === 'GRB') {
        question.type = 'imagepicker'
      }

      break

    case 'MC':
      question.type = 'radiogroup'

      if (q.questionType.selector.includes('SA')) {
        question.choices = []
        q.choices &&
          Object.keys(q.choices).map((key) => {
            question.choices.push({
              value: q.choices[key].recode,
              text: q.choices[key].choiceText,
            })
          })
      }

      if (q.questionType.selector.includes('MA')) {
        question.type = 'checkbox'
        question.choices = []
        q.choices &&
          Object.keys(q.choices).map((key) => {
            question.choices.push({
              value: q.choices[key].recode,
              text: q.choices[key].choiceText,
            })
          })
      }

      if (q.questionType.selector === 'NPS') {
        question.type = 'rating'
        question.rateMax = Object.keys(q.choices).length
      }

      if (q.questionType.selector === 'DL') {
        question.type = 'dropdown'
        question.choices = []
        q.choices &&
          Object.keys(q.choices).map((key) => {
            question.choices.push({
              value: q.choices[key].recode,
              text: q.choices[key].choiceText,
            })
          })
      }

      break

    case 'Matrix':
      question.type = 'matrix'

      question.rows = []
      q.subQuestions &&
        Object.keys(q.subQuestions).map((key) => {
          question.rows.push({
            value: q.subQuestions[key].recode,
            text: q.subQuestions[key].choiceText,
          })
        })

      question.columns = []
      q.choices &&
        Object.keys(q.choices).map((key) => {
          question.columns.push({
            value: q.choices[key].recode,
            text: q.choices[key].choiceText,
          })
        })

      if (q.questionType.subSelector === 'MultipleAnswer') {
        question.type = 'matrixdropdown'

        question.columns = []
        q.choices &&
          Object.keys(q.choices).map((key) => {
            question.columns.push({
              name: q.choices[key].recode,
              title: q.choices[key].choiceText,
            })
          })

        question.choices = ['yes', 'no']
      }

      if (
        q.questionType.selector === 'TE' ||
        q.questionType.selector === 'CS'
      ) {
        question.type = 'multipletext'

        question.items = []
        q.subQuestions &&
          Object.keys(q.subQuestions).map((key) => {
            question.items.push({
              name: q.subQuestions[key].recode,
              title: q.subQuestions[key].choiceText,
            })
          })
      }

      break

    case 'RO':
      question.type = 'ranking'
      question.choices = []
      q.choices &&
        Object.keys(q.choices).map((key) => {
          question.choices.push({
            value: q.choices[key].recode,
            text: q.choices[key].choiceText,
          })
        })

      break

    default:
      question.type = 'text'
  }

  return question
}
