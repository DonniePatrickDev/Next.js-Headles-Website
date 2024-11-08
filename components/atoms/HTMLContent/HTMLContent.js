import styles from './HTMLContent.module.scss'

export default function HTMLContent({ content }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className={styles.root}
    ></div>
  )
}
