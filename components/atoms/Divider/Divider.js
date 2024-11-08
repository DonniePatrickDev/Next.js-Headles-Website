import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './Divider.module.scss'

export default function Divider({ width, color, className }) {
  return (
    <div className={className}>
      <hr
        className={cn(
          styles.divider,
          width === 'thick' && styles.thick,
          color === 'purple'
            ? styles.purple
            : color === 'dark'
            ? styles.dark
            : styles.white
        )}
      />
    </div>
  )
}

Divider.propTypes = {
  width: PropTypes.oneOf(['thin', 'thick']),
  color: PropTypes.oneOf(['white', 'dark', 'purple']),
  className: PropTypes.string,
}

Divider.defaultProps = {
  width: 'thin',
  color: 'white',
}
