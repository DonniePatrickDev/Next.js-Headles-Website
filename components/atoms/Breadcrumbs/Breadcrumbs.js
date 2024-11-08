import cn from 'classnames'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Icon from '@/components/atoms/Icon'
import styles from './Breadcrumbs.module.scss'
import Divider from '../Divider/Divider'

/**
 * Render the Breadcrumbs component.
 *
 * @author WebDevStudios
 * @param  {object}  props             The component attributes as props.
 * @param  {Array}   props.breadcrumbs The breadcrumb array.
 * @return {Element}                   The Breadcrumbs component.
 */
export default function Breadcrumbs({ breadcrumbs, color }) {
  return (
    <div className={styles.root}>
      {color === 'white' ? (
        <>
          <div className={styles.inner}>
            {!!breadcrumbs?.length && (
              <ul className={cn(styles.breadcrumbs, 'breadcrumbs')}>
                {breadcrumbs.map((breadcrumb, index) => (
                  <li key={index}>
                    <Link href={breadcrumb?.url}>
                      <a className={styles.link}>
                        {breadcrumb?.icon && (
                          <Icon
                            icon={breadcrumb?.icon}
                            size={18}
                            alt={breadcrumb?.text}
                          />
                        )}
                        <span className={cn(styles.text, styles.white)}>
                          {breadcrumb?.text}
                        </span>
                      </a>
                    </Link>
                    {index < breadcrumbs.length - 1 && (
                      <span className={styles.sep}>
                        <Icon
                          icon='dot_white'
                          size={6}
                          alt={breadcrumb?.text}
                        />
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Divider color='white' />
        </>
      ) : (
        <>
          <div className={styles.inner}>
            {!!breadcrumbs?.length && (
              <ul className={cn(styles.breadcrumbs, 'breadcrumbs')}>
                {breadcrumbs.map((breadcrumb, index) => (
                  <li key={index}>
                    <Link href={breadcrumb?.url}>
                      <a className={styles.link}>
                        {breadcrumb?.icon && (
                          <Icon
                            icon={breadcrumb?.icon}
                            size={18}
                            alt={breadcrumb?.text}
                          />
                        )}
                        <span className={styles.text}>{breadcrumb?.text}</span>
                      </a>
                    </Link>
                    {index < breadcrumbs.length - 1 && (
                      <span className={styles.sep}>
                        <Icon icon='dot' size={6} alt={breadcrumb?.text} />
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Divider color='dark' />
        </>
      )}
    </div>
  )
}

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.array.isRequired,
  color: PropTypes.string,
}
