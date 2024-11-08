import PropTypes from 'prop-types'
import cn from 'classnames'
import {
  getAuthor,
  getImage,
  getMarketInsightTags,
  getMarketInsightTopics,
} from '@/functions/wordpress/fetchData'
import Tag from '@/components/atoms/Tag'
import Link from 'next/link'
import moment from 'moment'
import styles from './MarketInsightRecommendationCard.module.scss'
import Meta from '@/components/atoms/Meta'
import Background from '@/components/atoms/Background'
import Cta from '@/components/atoms/Cta'
import Icon from '@/components/atoms/Icon'

export default function MarketInsightRecommendationCard({
  post,
  link,
  className,
}) {
  const { tags } = getMarketInsightTags(post.id)
  const { topics } = getMarketInsightTopics(post.id)
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

              <div className='mt-3'>
                {topics?.length && (
                  <div className='flex gap-2 items-center mt-3 lg:mt-0'>
                    {topics.map((topic, index) => (
                      <Icon key={index} icon={`dha-${topic.slug}`} size={24} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

MarketInsightRecommendationCard.propTypes = {
  post: PropTypes.object,
  link: PropTypes.string,
  className: PropTypes.string,
}
