import Background from '@/components/atoms/Background'
import Breadcrumbs from '@/components/atoms/Breadcrumbs'
import HTMLContent from '@/components/atoms/HTMLContent'
import Meta from '@/components/atoms/Meta'
import Tag from '@/components/atoms/Tag'
import {
  getAuthor,
  getImage,
  getPostTags,
} from '@/functions/wordpress/fetchData'
import moment from 'moment'
import styles from './PostHero.module.scss'

export default function PostHero({ post, breadcrumbs }) {
  const { tags } = getPostTags(post.id)
  const { author } = getAuthor(post.author)
  const { image } = getImage(post.featured_media)

  if (image) {
    return (
      <div className='relative bg-dark bg-opacity-50'>
        <div className={styles.bgWrap}>
          <Background image={image.source_url} />
        </div>

        <Breadcrumbs breadcrumbs={breadcrumbs} color='white' />

        <div className={styles.inner}>
          <div className={styles.tagsWrap}>
            {Array.isArray(tags) &&
              tags?.map((tag, index) => <Tag text={tag.name} key={index} />)}
          </div>

          <h1 className={styles.title}>
            {post.title?.rendered.replace('&#8230;', '.')}
          </h1>

          <div className={styles.excerpt}>
            <HTMLContent content={post.yoast_head_json?.og_description} />
          </div>

          <div className={styles.metaWrap}>
            <Meta
              meta1={author ? author.name : 'admin'}
              meta2={moment(post.date).format('MMM D, YYYY, h:mm A')}
              showDot={true}
              color='white'
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <div className={styles.background}>
        <Breadcrumbs breadcrumbs={breadcrumbs} color='white' />

        <div className={styles.inner}>
          <div className={styles.tagsWrap}>
            {Array.isArray(tags) &&
              tags?.map((tag, index) => <Tag text={tag.name} key={index} />)}
          </div>

          <h1 className={styles.title}>
            {post.title?.rendered.replace('&#8230;', '.')}
          </h1>

          <div className={styles.excerpt}>
            <HTMLContent content={post.yoast_head_json?.og_description} />
          </div>

          <div className={styles.metaWrap}>
            <Meta
              meta1={author ? author.name : 'admin'}
              meta2={moment(post.date).format('MMM D, YYYY, h:mm A')}
              showDot={true}
              color='white'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
