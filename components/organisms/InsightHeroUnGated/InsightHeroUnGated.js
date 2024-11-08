import Background from '@/components/atoms/Background'
import Breadcrumbs from '@/components/atoms/Breadcrumbs'
import Meta from '@/components/atoms/Meta'
import Tag from '@/components/atoms/Tag'
import { getAuthor, getInsightTags } from '@/functions/wordpress/fetchData'
import moment from 'moment'
import styles from './InsightHeroUnGated.module.scss'
import Button from '@/components/atoms/Button'
import HTMLContent from '@/components/atoms/HTMLContent'

export default function InsightHeroUnGated({ article, breadcrumbs }) {
  const { tags } = getInsightTags(article.id)
  const { author } = getAuthor(article.author)

  return (
    <div className={styles.root}>
      <div className={styles.background}>
        <Background image='insight_bg' />
      </div>

      <Breadcrumbs breadcrumbs={breadcrumbs} color='white' />

      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.tagsWrap}>
            {Array.isArray(tags) &&
              tags?.map((tag, index) => <Tag text={tag.name} key={index} />)}
          </div>

          <h2 className={styles.subtitle}>A DHI Report</h2>

          <h1 className={styles.title}>
            {article.title?.rendered.replace('&#8230;', '.')}
          </h1>

          <p className='text-white text-left mb-5 mt-8'>Details</p>

          <div className={styles.excerpt}>
            <HTMLContent content={article.yoast_head_json?.og_description} />
          </div>

          <div className={styles.metaWrap}>
            <Meta
              meta1={author ? author.name : 'admin'}
              meta2={moment(article.date).format('MMM D, YYYY, h:mm A')}
              showDot={true}
              color='white'
            />
          </div>
        </div>

        <div className={styles.form}>
          <div className={styles.background}>
            <Background image='insight_bg_thumb' />
          </div>

          <Button
            type='tertiary'
            size='lg'
            weight='bold'
            text='Read the Report'
            href={article.acf?.linked_content_url}
            urlExternal={true}
            attributes={{ target: '_blank' }}
            className='mt-24 mb-24'
          />

          <div className={styles.metaWrap}>
            <Meta
              meta1={author ? author.name : 'admin'}
              meta2={moment(article.date).format('MMM D, YYYY, h:mm A')}
              showDot={true}
              color='white'
            />
          </div>

          <h3 className={styles.title}>
            {article.title?.rendered.replace('&#8230;', '.')}
          </h3>
        </div>
      </div>
    </div>
  )
}
