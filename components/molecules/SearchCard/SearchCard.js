import PropTypes from 'prop-types'
import cn from 'classnames'
import {
  getAuthor,
  getImage,
  getInsight,
  getPost,
  getPostTags,
} from '@/functions/wordpress/fetchData'
import Tag from '@/components/atoms/Tag'
import Link from 'next/link'
import Image from '@/components/atoms/Image'
import moment from 'moment'
import HTMLContent from '@/components/atoms/HTMLContent'
import Button from '@/components/atoms/Button'
import styles from './SearchCard.module.scss'
import Meta from '@/components/atoms/Meta'

export default function SearchCard({
  type,
  result,
  link,
  linkText,
  className,
}) {
  var data = {}
  if (type === 'insight') {
    data = getInsight(result.id)
  } else {
    data = getPost(result.id)
  }

  const { post } = data

  const { tags } = getPostTags(post?.id)
  const { author } = getAuthor(post?.author)
  const { image } = getImage(post?.featured_media)

  return (
    <div className={cn(styles.root, className)}>
      <div className={cn(styles.wrap)}>
        <div className={styles.image}>
          <Image
            src={image ? image.source_url : ''}
            href={link}
            nextImageFill={true}
          />
        </div>

        <div className={styles.inner}>
          <div className={styles.tags}>
            {Array.isArray(tags) &&
              tags?.map((tag, index) => (
                <Tag text={tag.name} type='primary' key={index} />
              ))}
          </div>

          <Link href={link}>
            <a className={styles.title}>
              {post?.title?.rendered.replace('&#8230;', '.')}
            </a>
          </Link>

          <div className={styles.content}>
            <HTMLContent content={post?.yoast_head_json?.og_description} />
          </div>

          <div className={styles.bottom}>
            <Meta
              meta1={author ? author.name : 'DHI Editor'}
              meta2={moment(post?.date).format('MMM D, YYYY, h:mm A')}
              color='dark'
              showDot={true}
            />
            <Button
              text={linkText}
              type='secondary'
              size='md'
              href={link}
              className={styles.button}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

SearchCard.propTypes = {
  type: PropTypes.string,
  post: PropTypes.object,
  link: PropTypes.string,
  linkText: PropTypes.string,
  className: PropTypes.string,
}

SearchCard.defaultProps = {
  type: 'insight',
}
