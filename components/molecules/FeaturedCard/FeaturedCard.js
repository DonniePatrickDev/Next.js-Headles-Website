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
import styles from './FeaturedCard.module.scss'
import Meta from '@/components/atoms/Meta'
import Background from '@/components/atoms/Background'
import Cta from '@/components/atoms/Cta'
import Divider from '@/components/atoms/Divider/Divider'

export default function FeaturedCard({
  post,
  link,
  linkText,
  showImage,
  bottomBlue,
  isHomePage,
  className,
}) {
  const { tags } = getInsightTags(post.id)
  const { author } = getAuthor(post.author)
  const { image } = getImage(post.featured_media)

  return (
    <div className={cn(styles.root, className)}>
      <div
        className={cn(
          styles.wrap,
          !showImage ? 'bg-purple' : 'bg-black bg-opacity-25'
        )}
      >
        {showImage && <Background className={cn(isHomePage ? styles.homeHero : '')} image={image ? image.source_url : ''} />}

        <div className={cn(styles.top, isHomePage ? styles.topOverwrite : '')}>
          <div className={styles.tags}>
            {Array.isArray(tags) &&
              tags?.map((tag, index) => <Tag text={tag.name} key={index} />)}
          </div>

          {!showImage && (
            <Link href={link}>
              <a>
                <h3 className={styles.title}>
                  {post.title?.rendered.replace('&#8230;', '.')}
                </h3>
              </a>
            </Link>
          )}
        </div>

        <div className={cn(styles.bottom, bottomBlue && 'bg-purple-dark')}>
          {showImage ? (
            <>
              <Link href={link}>
                <a>
                  <h3 className={styles.title}>
                    {post.title?.rendered.replace('&#8230;', '.')}
                  </h3>
                </a>
              </Link>

              <div className={styles.meta}>
                <Meta
                  meta1={author ? author.name : 'admin'}
                  meta2={moment(post.date).format('MMM D, YYYY, h:mm A')}
                  color='white'
                  showDot={true}
                />

                <Cta text={linkText} href={link} color='white' />
              </div>
            </>
          ) : (
            <>
              <Cta text={linkText} href={link} color='white' />

              <Divider />

              <div className={styles.meta}>
                <Meta
                  meta1={author ? author.name : 'admin'}
                  meta2={moment(post.date).format('MMM D, YYYY, h:mm A')}
                  color='white'
                  showDot={true}
                  fullWidth={true}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

FeaturedCard.propTypes = {
  post: PropTypes.object,
  link: PropTypes.string,
  linkText: PropTypes.string,
  showImage: PropTypes.bool,
  isHomePage: PropTypes.bool,
  bottomBlue: PropTypes.bool,
  className: PropTypes.string,
}

FeaturedCard.defaultProps = {
  linkText: 'Read Report',
  showImage: true,
  bottomBlue: false,
  isHomePage: false,
}
