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
import styles from './HeroCard.module.scss'
import Meta from '@/components/atoms/Meta'
import Background from '@/components/atoms/Background'
import Cta from '@/components/atoms/Cta'

export default function HeroCard({ post, link, linkText, className }) {
  const { tags } = getInsightTags(post.id)
  const { author } = getAuthor(post.author)
  const { image } = getImage(post.featured_media)

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.wrap}>
        <div className={styles.left}>
          <Background image={image ? image.source_url : ''} />
        </div>

        <div className={cn(styles.right, 'bg-purple-dark')}>
          <div className={styles.tags}>
            {Array.isArray(tags) &&
              tags?.map((tag, index) => <Tag text={tag.name} key={index} />)}
          </div>

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
        </div>
      </div>
    </div>
  )
}

HeroCard.propTypes = {
  post: PropTypes.object,
  link: PropTypes.string,
  linkText: PropTypes.string,
  className: PropTypes.string,
}

HeroCard.defaultProps = {
  linkText: 'Read Report',
}
