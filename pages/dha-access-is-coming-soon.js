import HtmlParser from 'html-react-parser'
import Background from '@/components/atoms/Background'
import Button from '@/components/atoms/Button'
import HubspotForm from '@/components/atoms/HubspotForm'
import Image from '@/components/atoms/Image'
import Layout from '@/components/common/Layout'

export default function ComingSoonPage({ page }) {
  const { yoast_head } = page

  return (
    <Layout seo={HtmlParser(yoast_head)} newsletter={false}>
      <div className='relative py-16'>
        <Background image='most_wired_hero' />

        <div
          className='container flex flex-col md:flex-row items-center gap-12 md:gap-8 mb-16 md:mb-8 mx-auto'
          style={{ maxWidth: '1400px' }}
        >
          <div className='md:w-5/12'>
            <div className='flex items-center'>
              <Image
                src='dha_logo_bold_white'
                width={220.75}
                height={106.5}
                alt='DHA Analytics'
                className='mx-auto mb-4'
              />
            </div>

            <h1 className='text-4xl font-bold text-white text-center'>
              Coming Soon
            </h1>
          </div>

          <div className='md:w-7/12'>
            <p className='text-lg text-white mb-6'>
              In the ever- evolving connectivity race, the CHIME Digital Health
              Most Wired program is innovating and navigating the new future
              alongside healthcare’s top professionals to equip you with the
              data, analyses, and insights you need to meet healthcare’s
              complexities head on. Join us a ViVE 2022 to experience the launch
              of our digital Health Analytics program and learn how you can gain
              exclusive access to our Provider and Market Research portals.
            </p>

            <Button
              text='Have questions regarding our Launch? Contact us'
              href='/contact'
              type='tertiary'
              size='lg'
            />
          </div>
        </div>

        <div
          className='mx-auto flex justify-center bg-white p-12'
          style={{ maxWidth: '564px' }}
        >
          <HubspotForm
            formId='f3ddfb3b-7d0d-4cbe-b6bd-6698facd7655'
            action='subscribe'
            className='article-subscribe'
          />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  /**
   * Page Content
   */
  const PAGE_ID = 863
  const res = await fetch(
    `https://dhix.dhinsights.org/wp-json/wp/v2/pages/${PAGE_ID}`
  )
  const page = await res.json()

  return {
    props: {
      page,
    },
    revalidate: 10,
  }
}
