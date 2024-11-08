import PropTypes from 'prop-types'
import cn from 'classnames'
import {
  getAuthor,
  getImage,
  getInsightTags,
} from '@/functions/wordpress/fetchData'
import Tag from '@/components/atoms/Tag'
import Link from 'next/link'
import moment from 'moment'
import styles from './RecommendationCard.module.scss'
import Meta from '@/components/atoms/Meta'
import Background from '@/components/atoms/Background'
import Cta from '@/components/atoms/Cta'

export default function RecommendationCard({ post, link, className }) {
  const { tags } = getInsightTags(post.id)
  const { author } = getAuthor(post.author)
  const { image } = getImage(post.featured_media)

  return (
    <div className={cn(styles.root, className)}>
      <Link href={link}>
        <a>
          <div className={cn(styles.wrap)}>
            <div className={cn(styles.top)}>
              <Background image={image ? image.source_url : ''} />

              <div className={styles.tags}>
                {Array.isArray(tags) &&
                  tags?.map((tag, index) => (
                    <Tag text={tag.name} key={index} />
                  ))}
              </div>
            </div>

            <div className={styles.bottom}>
              <h3 className={styles.title}>
                {post.title?.rendered.replace('&#8230;', '.')}
              </h3>

              <div className={styles.meta}>
                <Meta
                  meta1={author ? author.name : 'admin'}
                  meta2={moment(post.date).format('MMM D, YYYY, h:mm A')}
                  color='dark'
                  showDot={true}
                />

                <Cta text='' href={link} color='dark' />
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

RecommendationCard.propTypes = {
  post: PropTypes.object,
  link: PropTypes.string,
  className: PropTypes.string,
}
