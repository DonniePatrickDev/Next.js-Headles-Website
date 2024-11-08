import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import Image from '@/components/atoms/Image'
import Ad from '@/components/molecules/Ad'
import styles from './EventRegistration.module.scss'

export default function EventRegistration({ page }) {
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className='w-full md:w-3/4 bg-dark p-6'>
          <h5 className='text-base font-bold text-white text-right mb-4'>
            Register for the event to see the questions
          </h5>

          <Image
            src='logo_events'
            alt='Insights Event'
            width={444}
            height={73}
            className='mb-16'
          />

          <div className='flex flex-col md:flex-row gap-8 mb-16'>
            <div className='bg-purple px-4 py-8 w-full md:w-1/2'>
              <div className='flex mb-4'>
                <Icon icon='calendar' alt='Calendar' />
                <p className='text-base font-normal text-white ml-3'>
                  3:00pm EST.
                </p>
              </div>

              <div className='mb-6'>
                <p className='text-base font-semibold text-white'>
                  Janurary 12th, 2021
                </p>
              </div>

              <Button
                text='Register for Event'
                type='custom'
                size='md'
                className='bg-pink-200 text-white mt-4 md:mt-0'
              />
            </div>

            <div className='w-full md:w-1/2'>
              <p className='text-lg text-white'>
                Remote video conferencing raises a number of security issues.
                Which is of most concern?
              </p>

              <div className='mt-4'>
                <div className='flex items-center mt-2'>
                  <Icon icon='dot_outline' size={24} className='mr-4' />
                  <span className='text-base text-white'>Untrained Users</span>
                </div>

                <div className='flex items-center mt-2'>
                  <Icon icon='dot_outline' size={24} className='mr-4' />
                  <span className='text-base text-white'>
                    Home video devices with less robust
                  </span>
                </div>

                <div className='flex items-center mt-2 opacity-60'>
                  <Icon icon='dot_outline' size={24} className='mr-4' />
                  <span className='text-base text-white'>
                    Where content and data are stored
                  </span>
                </div>

                <div className='flex items-center mt-2 opacity-30'>
                  <Icon icon='dot_outline' size={24} className='mr-4' />
                  <span className='text-base text-white'>
                    How content and data are stored
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Button
            text='Register for Event'
            type='primary'
            size='lg'
            className='mt-4 md:mt-0 w-full'
          />
        </div>

        <div className='flex flex-col md:w-1/4 justify-between'>
          <Ad
            type='square'
            ad_image={page.acf?.ad_side_1?.ad_image}
            ad_link={page.acf?.ad_side_1?.ad_link}
            classes={page.acf?.ad_side_1?.ad_tracking_classes}
          />

          <Ad
            type='square'
            ad_image={page.acf?.ad_side_2?.ad_image}
            ad_link={page.acf?.ad_side_2?.ad_link}
            classes={page.acf?.ad_side_2?.ad_tracking_classes}
          />
        </div>
      </div>
    </div>
  )
}
