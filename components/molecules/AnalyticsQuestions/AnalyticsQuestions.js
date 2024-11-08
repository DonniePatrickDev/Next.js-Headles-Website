import cn from 'classnames'
import styles from './AnalyticsQuestions.module.scss'

export default function AnalyticsQuestions({
  survey,
  selectedQuestionIds,
  setSelectedQuestionIds,
}) {
  const questions = survey?.result?.questions

  return (
    <>
      <h3 className={styles.title}>{survey?.result?.name}</h3>

      <div className={styles.questions}>
        {questions &&
          Object.keys(questions).map((key, index) => {
            if (questions[key]?.questionType?.type === 'MC') {
              return (
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
                  <input
                    type='checkbox'
                    className={styles.questionCheck}
                    checked={selectedQuestionIds?.includes(key)}
                    readOnly
                  />

                  <span>
                    {questions[key]?.questionText?.replace(/<[^>]+>/g, '')}
                  </span>
                </div>
              )
            }

            return <div key={index}></div>
          })}
      </div>
    </>
  )
}
