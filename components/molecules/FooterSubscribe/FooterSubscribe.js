import HubspotForm from '@/components/atoms/HubspotForm'
import Image from '@/components/atoms/Image'
import styles from './FooterSubscribe.module.scss'

export default function FooterSubscribe() {
  return (
    <section className={styles.root}>
      <div className={styles.background}>
        <Image
          src='newsletter_bg'
          alt='Newsletter Background'
          nextImageFill={true}
        />
      </div>

      <div className={styles.wrap}>
        <div className={styles.inner}>
          <div className={styles.left}>
            <div className={styles.logoWrap}>
              <Image
                src='dhi_logo_bold_dark'
                alt='Newsletter Logo'
                href='/'
                width={138.8}
                height={84.8}
                className={styles.logo}
              />

              <p className={styles.logoText}>
                Hear from the best of the best in Digital Healthcare.
              </p>
            </div>
          </div>

          <div className={styles.right}>
            <HubspotForm
              formId='1fac5830-43d6-43a5-b23c-146f7e5ab0f3'
              action='subscribe'
              className='footer-subscribe'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
