import Icon from '@/components/atoms/Icon'
import styles from './FooterSocial.module.scss'

export default function FooterSocial() {
  return (
    <section className={styles.root}>
      <div className={styles.wrap}>
        <div className={styles.inner}>
          <div className={styles.socialWrap}>
            <div className={styles.social}>
              <a
                href='https://www.facebook.com/dhinsights'
                target='_blank'
                rel='noreferrer'
                className={styles.icon}
              >
                <Icon icon='facebook_white' alt='Facebook' />
                <span className={styles.iconText}>Facebook</span>
              </a>

              {/* <a href='#' className={styles.icon}>
                <Icon icon='twitter_white' alt='Twitter' />

                <span className={styles.iconText}>Twitter</span>
              </a> */}

              <a
                href='https://www.linkedin.com/showcase/digitalhealthinsights/'
                target='_blank'
                rel='noreferrer'
                className={styles.icon}
              >
                <Icon icon='linkedin_white' alt='LinkedIn' />

                <span className={styles.iconText}>LinkedIn</span>
              </a>

              {/* <a href='#' className={styles.icon}>
                <Icon icon='rss_white' alt='RSS' />

                <span className={styles.iconText}>RSS Feed</span>
              </a> */}
            </div>
          </div>

          <div className={styles.copyrightWrap}>
            <span className={styles.copyright}>
              © 2022 CHIME College of Healthcare Information Management
              Executives. All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
