import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './Tag.module.scss'

export default function Tag({ text, type, className, style }) {
  if (text === 'Sponsored Article') {
    return <></>
  }

  return (
    <span
      className={cn(
        styles.tag,
        type === 'primary' ? styles.primary : styles.secondary,
        className
      )}
      style={style}
    >
      {text}
    </span>
  )
}

Tag.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'secondary']),
  className: PropTypes.string,
}

Tag.defaultProps = {
  type: 'primary',
}
