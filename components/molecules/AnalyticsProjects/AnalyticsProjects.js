import cn from 'classnames'
import styles from './AnalyticsProjects.module.scss'

export default function AnalyticsProjects({
  surveys,
  selectedSurveyId,
  setSelectedSurveyId,
}) {
  return (
    <div className={styles.surveys}>
      {surveys &&
        surveys.map((survey, index) => (
          <div
            key={index}
            className={cn(
              styles.survey,
              selectedSurveyId === survey.id && styles.active
            )}
            onClick={() => setSelectedSurveyId(survey.id)}
          >
            <div className={styles.surveyInner}>
              <div className={styles.surveyCircle}></div>
              <div className={styles.surveyName}>{survey.name}</div>
            </div>
          </div>
        ))}
    </div>
  )
}
