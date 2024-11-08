import PropTypes from 'prop-types'
import cn from 'classnames'
import Icon from '@/components/atoms/Icon'
import styles from './Meta.module.scss'

export default function Meta({ meta1, meta2, showDot, color, fullWidth }) {
  return (
    <div
      className={cn(
        styles.root,
        color === 'purple'
          ? styles.purple
          : color === 'dark'
          ? styles.dark
          : styles.white,
        fullWidth && styles.fullWidth
      )}
    >
      {meta1 && (
        <span className={cn(styles.meta, showDot && styles.showDot)}>
          By {meta1}
        </span>
      )}

      {meta2 && (
        <span className={styles.meta}>
          {showDot && (
            <Icon
              icon={color === 'white' ? 'dot_white' : 'dot'}
              size={6}
              className={styles.dot}
            />
          )}
          {meta2}
        </span>
      )}
    </div>
  )
}

Meta.propTypes = {
  meta1: PropTypes.string,
  meta2: PropTypes.string,
  showDot: PropTypes.bool,
  color: PropTypes.oneOf(['white', 'purple', 'dark']),
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
}

Meta.defaultProps = {
  showDot: false,
  color: 'white',
  fullWidth: false,
}
