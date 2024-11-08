import Background from '@/components/atoms/Background'
import Breadcrumbs from '@/components/atoms/Breadcrumbs'
import AdvertiseForm from '@/components/molecules/AdvertiseForm'
import styles from './AdvertiseHero.module.scss'

export default function AdvertiseHero({ breadcrumbs, description }) {
  return (
    <div className={styles.root}>
      <div className={styles.bgWrap}>
        <Background image='most_wired_hero' />
      </div>

      <Breadcrumbs breadcrumbs={breadcrumbs} color='white' />

      <div className={styles.inner}>
        <div>
          <h1 className={styles.title}>
            Advertising & Sponsorships within DHI
          </h1>
          <p className={styles.text}>{description}</p>
        </div>

        <AdvertiseForm />
      </div>
    </div>
  )
}
