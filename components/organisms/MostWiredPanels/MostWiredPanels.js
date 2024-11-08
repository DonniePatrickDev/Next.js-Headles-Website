import Button from '@/components/atoms/Button'
import Image from '@/components/atoms/Image'

export default function MostWiredHero() {
  return (
    <>
      <div className='container flex justify-center my-12'>
        <div className='text-center border-l-2 border-r-2 border-dashed border-pink px-10 py-6'>
          <Image
            src='dha_logo_regular_dark'
            width={176.6}
            height={67.5}
            alt='DHX'
            className='mb-2'
          />

          <h3
            className='text-purple-dark font-bold text-center'
            style={{ fontSize: '40px' }}
          >
            How will DHA be Delivered
          </h3>
        </div>
      </div>

      <div className='container grid md:grid-cols-2 gap-4 md:gap-8 my-12'>
        <div className='bg-gray-200'>
          <Image
            src='x_background_thin'
            width={1134}
            height={194}
            alt='X Background'
          />

          <div className='px-10 py-5'>
            <h4 className='text-purple-dark text-2xl font-bold mb-4'>
              Market Research Portal
            </h4>

            <ul className='pl-5 list-disc text-purple-dark text-xl mb-12 md:mb-24'>
              <li>
                Access insight reports from the most recent Digital Health Most
                Wired survey, including the National Trends Report.
              </li>
              <li>
                Access digital media content in the form of infographics,
                research reports, trend studies, and media supplements
                concentrated on the designated segments of the Digital Health
                Most Wired Survey.
              </li>

              <Button
                text='Access Now'
                size='lg'
                type='custom'
                href='/portal?commercial=true'
                className='text-purple bg-pink-100 hover:bg-gray-200 border border-purple mt-4'
              />
            </ul>

            <h4 className='text-purple-dark text-2xl font-bold mb-4'>
              Market Research + Portal
            </h4>

            <ul className='pl-5 list-disc text-purple-dark text-xl mb-8'>
              <li>Accessible via an upgrade.</li>
              <li>
                Access insight reports from the most recent Digital Health Most
                Wired survey, including the National Trends Report.
              </li>
              <li>
                Query the DHMW database across our pre-selected variables and
                gain exclusive access to custom market intelligence and survey
                segment trends specific to your scope of business.
              </li>
              <li>
                Query the DHMW database across our pre-selected variables and
                gain exclusive access to custom market intelligence and survey
                segment trends specific to your scope of business.
              </li>
              <li>
                Access premium digital media content in the form of
                infographics, webinars, podcasts, case studies, research
                reports, trend studies, and media supplements concentrated on
                the designated segments of the Digital Health Most Wired Survey.
              </li>

              <Button
                text='Access Now'
                size='lg'
                type='custom'
                href='/portal/membership/market-research-upgrade'
                className='text-purple bg-pink-100 hover:bg-gray-200 border border-purple mt-6'
              />
            </ul>
          </div>
        </div>

        <div className='bg-gray-200'>
          <Image
            src='x_background_thin'
            width={1134}
            height={194}
            alt='X Background'
          />

          <div className='px-10 py-5'>
            <h4 className='text-purple-dark text-2xl font-bold mb-4'>
              New Provider Portal
            </h4>

            <ul className='pl-5 list-disc text-purple-dark text-xl mb-12 md:mb-24'>
              <li>
                Provider members who have previously participated in the Digital
                Health Most Wired Survey receive complimentary access to our
                Provider portal. Please access the portal above with your
                organization-specific credentials.
              </li>
              <li>
                If you are new to the program please click the REGISTER NOW
                button below to enroll in the Digital Health Most Wired Survey
                program and gain access to the DHA platform. Through the
                platform you will have the ability to:
              </li>
              <ul className='pl-6' style={{ listStyle: 'circle' }}>
                <li>
                  Access your latest Digital Health Most Wired Survey reports,
                  including the National Trend Reports.
                </li>
                <li>
                  Query the DHMW database across our pre-designed, customizable
                  reports. You are allowed three (3) reports with your account
                  subscription.
                </li>
                <li>
                  Participate in surveys created by your peers and from other
                  industry sources.
                </li>
                <li>
                  Access digital media content in the form of infographics,
                  webinars, podcasts, case studies, research reports, trend
                  studies, and media supplements concentrated on the designated
                  segments of the Digital Health Most Wired Survey.
                </li>
              </ul>

              <Button
                text='Register Now'
                size='lg'
                type='custom'
                href='/portal/register'
                className='text-purple bg-pink-100 hover:bg-gray-200 border border-purple mt-6'
              />
            </ul>

            <h4 className='text-purple-dark text-2xl font-bold mb-4'>
              Provider + Portal
            </h4>

            <ul className='pl-5 list-disc text-purple-dark text-xl mb-8'>
              <li>Accessible via an upgrade inside your Provider portal.</li>
              <li>
                Access your latest Digital Health Most Wired Survey reports,
                including the National Trend Reports.
              </li>
              <li>
                Unlimited queries of the DHMW database across our pre-selected
                variables and gain exclusive access to custom benchmarking
                insights.
              </li>
              <li>
                Participate in surveys created by your peers and from other
                industry sources. You can also create your own surveys of peers
                and other industry professionals.
              </li>
              <li>
                Access premium digital media content in the form of
                infographics, webinars, podcasts, case studies, research
                reports, trend studies, and media supplements concentrated on
                the designated segments of the Digital Health Most Wired Survey.
              </li>

              <Button
                text='Access Now'
                size='lg'
                type='custom'
                href='/portal/membership/provider-upgrade'
                className='text-purple bg-pink-100 hover:bg-gray-200 border border-purple mt-6'
              />
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
