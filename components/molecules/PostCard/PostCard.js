import PropTypes from 'prop-types'
import cn from 'classnames'
import {
  getAuthor,
  getImage,
  getPostTags,
} from '@/functions/wordpress/fetchData'
import Tag from '@/components/atoms/Tag'
import Link from 'next/link'
import Image from '@/components/atoms/Image'
import moment from 'moment'
import HTMLContent from '@/components/atoms/HTMLContent'
import Button from '@/components/atoms/Button'
import styles from './PostCard.module.scss'
import Meta from '@/components/atoms/Meta'
import { useEffect } from 'react'


export default function PostCard({
  post,
  link,
  linkText,
  showTags,
  showCategory,
  showImage,
  showExcerpt,
  showButton,
  showMeta,
  className,
}) {
  const { tags } = getPostTags(post.id)
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

          <div className={styles.tags}>
            {showCategory && (<Tag text={post.categoryName} type='primary' />
            )}
          </div>

          {!showCategory && Array.isArray(tags) && (
            <div className={styles.tags}>
              {tags?.map((tag, index) => (
                <Tag text={tag.name} type='primary' key={index} />
              ))}
            </div>
          )}


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

PostCard.propTypes = {
  post: PropTypes.object,
  link: PropTypes.string,
  linkText: PropTypes.string,
  showTags: PropTypes.bool,
  showCategory: PropTypes.bool,
  showImage: PropTypes.bool,
  showExcerpt: PropTypes.bool,
  showButton: PropTypes.bool,
  showMeta: PropTypes.bool,
  className: PropTypes.string,
}

PostCard.defaultProps = {
  showTags: true,
  showImage: true,
  showExcerpt: true,
  showButton: true,
  showMeta: true,
  linkText: 'Read Article',
  showCategory: false,
}
