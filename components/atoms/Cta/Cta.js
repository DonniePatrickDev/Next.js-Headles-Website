import Link from 'next/link'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Icon from '@/components/atoms/Icon'
import styles from './Cta.module.scss'

export default function Cta({
  text,
  href,
  color,
  fullWidth,
  hoverIcon,
  className,
}) {
  return (
    <Link href={href}>
      <a
        className={cn(
          styles.root,
          color === 'purple'
            ? styles.purple
            : color === 'dark'
            ? styles.dark
            : styles.white,
          fullWidth && styles.fullWidth,
          hoverIcon && styles.hoverIcon,
          className
        )}
      >
        <span className={styles.text}>{text}</span>
        <Icon
          icon={color === 'white' ? 'path_white' : 'path'}
          className={styles.icon}
        />
      </a>
    </Link>
  )
}

Cta.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string,
  color: PropTypes.oneOf(['white', 'purple', 'dark']),
  fullWidth: PropTypes.bool,
  hoverIcon: PropTypes.bool,
  className: PropTypes.string,
}

Cta.defaultProps = {
  color: 'white',
  href: '#',
  fullWidth: false,
  hoverIcon: false,
}
