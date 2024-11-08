import cn from 'classnames'
import styles from './PageContent.module.scss'

export default function PageContent({ content, color, className }) {
  return (
    <div className={cn(styles[color], className)}>
      {content.map((row, index) => {
        if (row.type === 'Title') {
          return (
            <h3 className={styles.title} key={index}>
              {row.text}
            </h3>
          )
        } else if (row.type === 'Text') {
          return (
            <p className={styles.text} key={index}>
              {row.text}
            </p>
          )
        }
      })}
    </div>
  )
}
