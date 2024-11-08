import PropTypes from 'prop-types'
import cn from 'classnames'
import Image from '@/components/atoms/Image'
import styles from './Background.module.scss'

export default function Background({ image, className }) {
  return (
    <div className={cn(styles.root, className)}>
      <Image src={image} nextImageFill={true} />
    </div>
  )
}

Background.propTypes = {
  image: PropTypes.string,
  className: PropTypes.string,
}
