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
import Image from '@/components/atoms/Image'
import moment from 'moment'
import HTMLContent from '@/components/atoms/HTMLContent'
import Button from '@/components/atoms/Button'
import styles from './MarketInsightCard.module.scss'
import Meta from '@/components/atoms/Meta'
import Icon from '@/components/atoms/Icon'

export default function MarketInsightCard({
  post,
  link,
  linkText,
  showTags,
  showImage,
  showExcerpt,
  showButton,
  showMeta,
  className,
}) {
  const { tags } = getMarketInsightTags(post.id)
  const { topics } = getMarketInsightTopics(post.id)
  const { author } = getAuthor(post.author)
  const { image } = getImage(post.featured_media)

  return (
    <div className={cn(styles.root, className)}>
      <div className={cn(styles.wrap)}>
        {showImage && (
          <div className={styles.image}>
            <Image
              src={image ? image.source_url : ''}
              href={link}
              nextImageFill={true}
            />
          </div>
        )}

        <div className={styles.inner}>
          <div className='flex flex-wrap justify-between items-center'>
            {showTags && Array.isArray(tags) && (
              <div className={styles.tags}>
                {tags?.map((tag, index) => (
                  <Tag text={tag.name} type='primary' key={index} />
                ))}
              </div>
            )}

            {topics?.length && (
              <div className='flex gap-2 items-center mt-3 lg:mt-0'>
                {topics.map((topic, index) => (
                  <Icon key={index} icon={`dha-${topic.slug}`} size={24} />
                ))}
              </div>
            )}
          </div>

          <Link href={link}>
            <a className={styles.title}>
              {post.title?.rendered.replace('&#8230;', '.')}
            </a>
          </Link>

          {showExcerpt && (
            <div className={styles.content}>
              <HTMLContent content={post.yoast_head_json?.og_description} />
            </div>
          )}

          <div className={styles.bottom}>
            {showMeta && (
              <Meta
                meta1={author ? author.name : 'DHI Editor'}
                meta2={moment(post.date).format('MMM D, YYYY, h:mm A')}
                color='dark'
                showDot={true}
              />
            )}
            {showButton && (
              <Button
                text={linkText}
                type='secondary'
                size='md'
                href={link}
                className={styles.button}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

MarketInsightCard.propTypes = {
  post: PropTypes.object,
  link: PropTypes.string,
  linkText: PropTypes.string,
  showTags: PropTypes.bool,
  showImage: PropTypes.bool,
  showExcerpt: PropTypes.bool,
  showButton: PropTypes.bool,
  showMeta: PropTypes.bool,
  className: PropTypes.string,
}

MarketInsightCard.defaultProps = {
  showTags: true,
  showImage: true,
  showExcerpt: true,
  showButton: true,
  showMeta: true,
  linkText: 'Read Article',
}
