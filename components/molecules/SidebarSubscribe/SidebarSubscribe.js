import HubspotForm from '@/components/atoms/HubspotForm'
import Image from '@/components/atoms/Image'
import styles from './SidebarSubscribe.module.scss'

export default function SidebarSubscribe() {
  return (
    <div className={styles.sidebar}>
      <h3 className={styles.sidebarTitle}>Subscribe</h3>

      <div className={styles.sidebarInner}>
        <Image
          src='dhi_logo_bold_white'
          alt='Newsletter Logo'
          href='/'
          width={138.8}
          height={84.8}
        />

        <p className='text-white font-semibold text-lg mt-3'>
          Subscribe to our topic-centric newsletters to get the latest insights
          delivered to your inbox weekly.
        </p>

        <p className='text-white text-base font-normal mt-4'>
          Enter your information below
        </p>

        <div className='my-4'>
          <HubspotForm
            formId='74cde009-8a7f-44d0-b494-593a60c44036'
            className='sidebar-subscribe'
            action='subscribe'
          />
          <p className='text-white text-base font-normal'>By submitting this form, you are agreeing to DHI’s Privacy Policy and Terms of Use.</p>
        </div>
      </div>
    </div>
  )
}
