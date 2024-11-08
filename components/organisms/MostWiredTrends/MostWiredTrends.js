import Button from '@/components/atoms/Button'
import Divider from '@/components/atoms/Divider/Divider'
import Image from '@/components/atoms/Image'

export default function MostWiredTrends() {
  return (
    <>
      <div className='container my-12'>
        <div className='flex flex-row justify-center items-center mb-10'>
          <Image
            src='dha_logo_regular_dark'
            width={88}
            height={34}
            alt='DHX'
            className='mr-3 flex items-center'
          />

          <h2 className='text-purple-dark font-bold text-4xl'>
            Annual Survey, National Trends
          </h2>
        </div>

        <div className='grid md:grid-cols-3 gap-6 mb-16'>
          <div className='pt-4 pb-6 text-center bg-white shadow-sm'>
            <h3 className='text-purple-dark text-6xl font-bold'>738</h3>

            <p className='text-lg text-purple-dark font-bold uppercase'>
              surveys
            </p>
          </div>

          <div className='pt-4 pb-6 text-center bg-white shadow-sm'>
            <h3 className='text-purple-dark text-6xl font-bold'>36,674</h3>

            <p className='text-lg text-purple-dark font-bold uppercase'>
              Facilities
            </p>
          </div>

          <div className='pt-4 pb-6 text-center bg-white shadow-sm'>
            <h3 className='text-purple-dark text-6xl font-bold'>7</h3>

            <p className='text-lg text-purple-dark font-bold uppercase'>
              countries
            </p>
          </div>
        </div>

        <div className='grid md:grid-cols-2 gap-8 mb-16'>
          <div>
            <h3 className='text-4xl text-purple-dark font-bold mb-6'>
              Get access and recieve the Insight Overview Doc.
            </h3>

            <p className='text-lg text-purple-dark mb-6'>
              Digital Health Insights delivers actionable information on the
              most pressing issues facing healthcare professionals today.
              Connect with our team of experts to learn more about our
              integrated campaigns designed to accomplish your marketing goals.
            </p>

            <Button
              text='Request More Information'
              href='/contact'
              type='primary'
              size='lg'
            />
          </div>

          <Image src='most_wired_trend' width={568} height={327} alt='Trends' />
        </div>

        <Divider color='purple' />
      </div>
    </>
  )
}
