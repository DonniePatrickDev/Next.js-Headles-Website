import cn from 'classnames'
import styles from './ReportsProjects.module.scss'

export default function ReportsProjects({
  analytics,
  selectedAnalysisId,
  setSelectedAnalysisId,
}) {
  return (
    <div className={styles.surveys}>
      {analytics?.length &&
        analytics.map((analysis, index) => {
          return (
            <div
              key={index}
              className={cn(
                styles.survey,
                selectedAnalysisId === analysis.pk && styles.active
              )}
              onClick={() => setSelectedAnalysisId(analysis.pk)}
            >
              <div className={styles.surveyInner}>
                <div className={styles.surveyCircle}></div>
                <div className={styles.surveyName}>
                  {analysis?.analysis_name}
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}
