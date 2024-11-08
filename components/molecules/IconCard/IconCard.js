import Link from 'next/link'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Icon from '@/components/atoms/Icon'
import Image from '@/components/atoms/Image'
import styles from './IconCard.module.scss'
import Background from '@/components/atoms/Background'
import Button from '@/components/atoms/Button'

export default function IconCard({
  type,
  image,
  icon,
  background,
  title,
  text,
  subtext,
  href,
  onClick,
  button,
  className,
}) {
  if (type === 1) {
    return (
      <div className={styles.root}>
        <Background image={background} />

        <Link href={href}>
          <a>
            <div className={cn(styles.wrap, styles.primary, className)}>
              <div className={styles.main}>
                <Image
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={image.alt}
                  className={styles.image}
                />

                <div>
                  <span className={styles.title}>
                    {title}
                    <Icon icon='path_white' className={styles.pathIcon} />
                  </span>

                  <p className={styles.text}>{text}</p>
                </div>
              </div>
            </div>
          </a>
        </Link>
      </div>
    )
  } else if (type === 2) {
    return (
      <div className={styles.root}>
        <Link href={href}>
          <a>
            <div className={cn(styles.wrap, styles.secondary, className)}>
              <div className={styles.main}>
                <Image
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={image.alt}
                  className={styles.image}
                />

                <div>
                  <span className={styles.title}>
                    {title}
                    <Icon icon='path' className={styles.pathIcon} />
                  </span>

                  <p className={styles.text}>{text}</p>
                </div>
              </div>
            </div>
          </a>
        </Link>
      </div>
    )
  } else if (type === 3) {
    return (
      <div className={styles.root}>
        <Link href={href}>
          <a>
            <div className={cn(styles.wrap, styles.tertiary, className)}>
              <Image
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt}
                className={styles.image}
              />

              <div className={styles.main}>
                <Icon
                  icon={icon.src}
                  size={icon.size}
                  className={styles.icon}
                />
                <div className='flex-grow'>
                  <div className={styles.title}>
                    {title}
                    <Icon icon='path' className={styles.pathIcon} />
                  </div>
                  <p className={styles.text}>{text}</p>
                </div>
              </div>
            </div>
          </a>
        </Link>
      </div>
    )
  } else if (type === 4) {
    return (
      <div className={styles.root}>
        <div className={cn(styles.wrap, styles.tertiary, className)}>
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
            className={styles.image}
          />

          <div className={styles.main}>
            <Icon icon={icon.src} size={icon.size} className={styles.icon} />
            <div className='flex-grow'>
              <div className={styles.title}>{title}</div>
              <p className={styles.text}>{text}</p>

              {onClick ? (
                <Button
                  onClick={onClick}
                  text={button}
                  type='primary'
                  className={styles.button}
                />
              ) : (
                <Button
                  href={href}
                  text={button}
                  type='primary'
                  className={styles.button}
                />
              )}

              <p className='text-sm'>{subtext}</p>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return <></>
  }
}

IconCard.propTypes = {
  type: PropTypes.oneOf([1, 2, 3, 4]),
  image: PropTypes.object,
  icon: PropTypes.object,
  background: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  href: PropTypes.string,
  button: PropTypes.string,
  className: PropTypes.string,
}

IconCard.defaultProps = {
  type: 1,
  href: '#',
}
