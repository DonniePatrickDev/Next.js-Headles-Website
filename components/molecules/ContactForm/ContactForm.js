// import Button from '@/components/atoms/Button'
import Divider from '@/components/atoms/Divider/Divider'
import HubspotForm from '@/components/atoms/HubspotForm'
import Icon from '@/components/atoms/Icon'
import styles from './ContactForm.module.scss'

export default function ContactForm() {
  return (
    <div className={styles.root}>
      <Icon icon='contact_dark' size={75} className='mb-4' />

      <h3 className={styles.title}>
        Interested in advertising or partnership?
      </h3>

      <p className='text-base font-semibold mb-6'>
        Get a Walkthrough of common use-cases and overview of the DHI Platform
        followed by a Q&A
      </p>

      {/* <Button
        text='Email an Ad Specialist'
        href='mailto:editor@dhinsights.org'
        type='primary'
        urlExternal={true}
        className='w-full'
      /> */}

      <Divider color='purple' className='mb-8' />

      <h3 className={styles.title}>Contact Us</h3>

      <div className='my-4'>
        <HubspotForm
          formId='1f220c8a-217b-4ba5-98d9-5ca2da58548b'
          className='contact-us'
        />
      </div>
    </div>
  )
}
