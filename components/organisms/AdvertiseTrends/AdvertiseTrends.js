import Button from '@/components/atoms/Button'
import Divider from '@/components/atoms/Divider/Divider'
import Image from '@/components/atoms/Image'

export default function AdvertiseTrends() {
  return (
    <>
      <div className='container my-12'>
        <div className='mb-10 text-center max-w-xl mx-auto'>
          <h2 className='text-purple-dark font-bold mb-2 text-4xl'>
            Expand your Audience
          </h2>

          <p className='text-xl text-purple-dark'>
            Get exclusive insights. DHI delivers actionable information,
            analysis, and best practices to senior healthcare professionals as
            they continue to drive transformation throughout their
            organizations.
          </p>
        </div>

        <div className='mb-6 shadow-sm text-center p-6'>
          <Image
            src='dhi_logo_bold_dark'
            width={155}
            height={94}
            alt='DHX Analytics'
            className='mb-4'
          />

          <div className='flex flex-col md:flex-row gap-6 justify-evenly items-center'>
            <div className='pt-4 text-center bg-white'>
              <h3 className='text-purple-dark text-6xl font-bold'>38%</h3>

              <p
                className='text-lg text-purple-dark font-bold uppercase'
                style={{ maxWidth: '230px', letterSpacing: '3px' }}
              >
                hold executive level positions
              </p>
            </div>

            <div className='pt-4 text-center bg-white'>
              <h3 className='text-purple-dark text-6xl font-bold'>43%</h3>

              <p
                className='text-lg text-purple-dark font-bold uppercase'
                style={{ maxWidth: '230px', letterSpacing: '3px' }}
              >
                hold management positions
              </p>
            </div>

            <div className='pt-4 text-center bg-white'>
              <h3 className='text-purple-dark text-6xl font-bold'>34%</h3>

              <p
                className='text-lg text-purple-dark font-bold uppercase'
                style={{ maxWidth: '230px', letterSpacing: '3px' }}
              >
                work in a hospital settings
              </p>
            </div>
          </div>
        </div>

        <div className='mb-36 mt-16 md:mt-0'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-6'>
            <div className='p-4 shadow-sm text-center'>
              <Image
                src='logo_chime'
                width={242}
                height={99}
                alt='AEHIA'
                className='mr-6'
              />
            </div>

            <div className='p-4 shadow-sm text-center'>
              <Image
                src='logo_ahima'
                width={208}
                height={99}
                alt='AHIMA'
                className='mr-6'
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='p-4 shadow-sm text-center'>
              <Image
                src='logo_aehit'
                width={210}
                height={118}
                alt='AEHIA'
                className='mr-6'
              />
            </div>

            <div className='p-4 shadow-sm text-center'>
              <Image
                src='logo_aehis'
                width={210}
                height={118}
                alt='AEHIA'
                className='mr-6'
              />
            </div>

            <div className='p-4 shadow-sm text-center'>
              <Image
                src='logo_aehia'
                width={210}
                height={118}
                alt='AHIMA'
                className='mr-6'
              />
            </div>
          </div>
        </div>

        <div className='grid md:grid-cols-3 gap-16 mb-32'>
          <div className='col-span-1 flex flex-col justify-center items-start'>
            <h3 className='text-3xl md:text-4xl text-purple-dark font-bold mb-6'>
              Expand your Reach
            </h3>

            <p className='text-xl text-purple-dark mb-6'>
              Reach over 84,000 healthcare professionals working in large
              hospital systems, community & rural hospitals, integrated delivery
              networks, physician practices, clinics, long-term care facilities,
              and more.
            </p>

            <Button
              text='Request More Information'
              href='/contact'
              type='primary'
              size='lg'
            />
          </div>

          <div className='md:col-span-2 flex flex-col justify-center'>
            <Image
              src='advertise_expand_your_reach'
              width={5892}
              height={1736}
              alt='Trends'
            />
          </div>
        </div>

        <div className='grid md:grid-cols-2 gap-8 mb-16'>
          <Image
            src='advertise_integrated_campaign'
            width={2560}
            height={2560}
            alt='Trends'
          />

          <div className='flex flex-col justify-center items-start'>
            <h3 className='text-3xl md:text-4xl text-purple-dark font-bold mb-6'>
              An Integrated Campaign Designed To Accomplish Your Marketing Goals
            </h3>

            <p className='text-xl text-purple-dark mb-6'>
              Our integrated marketing programs build brand preference, deliver
              thought leadership, include the creation of custom content, and
              drive guaranteed lead generation opportunities.
            </p>

            <Button
              text='Request More Information'
              href='/contact'
              type='primary'
              size='lg'
            />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-24'>
          <div></div>

          <div
            className='px-4 text-xl'
            style={{ borderLeft: '14px solid #4677BE' }}
          >
            Exclusive opportunity for one vendor partner per channel to
            contribute content and drive brand preference
          </div>

          <div
            className='px-4 text-xl'
            style={{ borderLeft: '14px solid #37C9EF' }}
          >
            Original content written and posted for each channel. Supported by
            contributed content from CHIME and AHIMA Members
          </div>

          <div
            className='px-4 text-xl'
            style={{ borderLeft: '14px solid #5662AB' }}
          >
            Quarterly Virtual Events developed to support the channel and engage
            users in education and conversation around the topic
          </div>

          <div
            className='px-4 text-xl'
            style={{ borderLeft: '14px solid #0EA1D5' }}
          >
            Each content channel is supported by a dedicated newsletter that's
            distributed to the most engaged audiences around the topic
          </div>

          <div
            className='px-4 text-xl'
            style={{ borderLeft: '14px solid #3EDAD8' }}
          >
            Audience engagement supported through a dedicated community on
            mydigitalhealthcommunity.org to drive conversation around the topic
          </div>
        </div>

        <Divider color='purple' />
      </div>
    </>
  )
}
