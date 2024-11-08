import PropTypes from 'prop-types'
import cn from 'classnames'
import Image from '@/components/atoms/Image'
import { getImage } from '@/functions/wordpress/fetchData'
import styles from './Ad.module.scss'

export default function Ad({ type, ad_image, ad_link, classes }) {
  if (ad_image && ad_link) {
    const { image } = getImage(ad_image)

    if (type === 'wide') {
      return (
        <div className={cn(styles.wide, classes)}>
          <div className={styles.wrap}>
            <Image
              src={
                image?.source_url
                  ? image.source_url
                  : ad_image.url
                  ? ad_image.url
                  : ''
              }
              width={970}
              height={250}
              href={ad_link}
              linkTarget='_blank'
            />
          </div>
        </div>
      )
    }

    if (type === 'square') {
      return (
        <div className={cn(styles.square, classes)}>
          <div className={styles.wrap}>
            <Image
              src={
                image?.source_url
                  ? image.source_url
                  : ad_image.url
                  ? ad_image.url
                  : ''
              }
              width={300}
              height={250}
              href={ad_link}
              linkTarget='_blank'
            />
          </div>
        </div>
      )
    }

    if (type === 'thin') {
      return (
        <div className={cn(styles.thin, classes)}>
          <div className={styles.wrap}>
            <Image
              src={
                image?.source_url
                  ? image.source_url
                  : ad_image.url
                  ? ad_image.url
                  : ''
              }
              width={728}
              height={90}
              href={ad_link}
              linkTarget='_blank'
            />
          </div>
        </div>
      )
    }
  }

  return <></>
}

Ad.propTypes = {
  type: PropTypes.oneOf(['wide', 'square', 'thin']),
}

Ad.defaultProps = {
  type: 'wide',
}
