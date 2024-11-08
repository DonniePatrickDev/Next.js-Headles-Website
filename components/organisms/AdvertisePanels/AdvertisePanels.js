import Button from '@/components/atoms/Button'
import Divider from '@/components/atoms/Divider/Divider'
import Image from '@/components/atoms/Image'

export default function AdvertisePanels() {
  return (
    <div className='container'>
      <div className='grid md:grid-cols-2 gap-4 md:gap-8 mt-24 mb-8'>
        <div className='bg-gray-200'>
          <div className='px-10 py-6 bg-purple-light'>
            <h3 className='text-purple-dark text-3xl md:text-4xl font-bold'>
              Pick your Topic
            </h3>
          </div>

          <div className='px-10 py-5'>
            <h4 className='text-purple-dark text-xl md:text-2xl font-bold mb-4'>
              Topics
            </h4>

            <ul className='pl-5 list-disc text-purple-dark text-xl mb-12'>
              <li>AI, Machine Learning and Automation</li>
              <li>Clinical Informatics</li>
              <li>Digital Health Leadership and Transformation</li>
              <li>Patient Consumerization</li>
              <li>Virtual Care</li>
            </ul>
          </div>
        </div>

        <div className='bg-gray-200'>
          <div className='px-10 py-6 bg-purple-light'>
            <h3 className='text-purple-dark text-3xl md:text-4xl font-bold'>
              Immerse your Brand
            </h3>
          </div>

          <div className='px-10 py-5'>
            <h4 className='text-purple-dark text-xl md:text-2xl font-bold mb-4'>
              Features
            </h4>

            <ul className='pl-5 list-disc text-purple-dark text-xl mb-12'>
              <li>Be part of the conversation</li>
              <li>Lead with intelligence to create demand</li>
              <li>Build thought leadership and visibility</li>
              <li>Drive demand and brand preference for your solutions</li>
            </ul>
          </div>
        </div>
      </div>

      <div className='text-center mb-24'>
        <Button
          text='Request More Information'
          size='lg'
          type='primary'
          href='/contact'
        />
      </div>

      <Divider color='purple' />

      <div className='grid md:grid-cols-2 gap-8 my-24'>
        <div>
          <h3 className='text-3xl md:text-4xl text-purple-dark font-bold mb-6'>
            Get access and recieve the Insight Overview Doc.
          </h3>

          <p className='text-lg text-purple-dark mb-6'>
            Digital Health Insights delivers actionable information on the most
            pressing issues facing healthcare professionals today. Connect with
            our team of experts to learn more about our integrated campaigns
            designed to accomplish your marketing goals.
          </p>

          <Button
            text='Request More Information'
            href='/contact'
            type='primary'
            size='lg'
          />
        </div>

        <Image
          src='advertise_x_factor'
          width={2569}
          height={1440}
          alt='Trends'
        />
      </div>
    </div>
  )
}
