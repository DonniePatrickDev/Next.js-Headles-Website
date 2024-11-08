import HubspotForm from '@/components/atoms/HubspotForm'
import styles from './AdvertiseForm.module.scss'

export default function AdvertiseForm() {
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>Contact Us to Advertise</h3>

      <HubspotForm
        formId='1fff0384-0063-4a55-95da-91f4638f813c'
        className='contact-us'
      />
    </div>
  )
}
