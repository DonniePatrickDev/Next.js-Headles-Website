import HtmlParser from 'html-react-parser'
import Background from '@/components/atoms/Background'
import Icon from '@/components/atoms/Icon'
import Layout from '@/components/common/Layout'
import ContactForm from '@/components/molecules/ContactForm'
import PageContent from '@/components/organisms/PageContent'

export default function ContactPage({ page }) {
  const { yoast_head } = page

  return (
    <Layout seo={HtmlParser(yoast_head)} newsletter={false}>
      <div className='relative'>
        <Background image='contact_background' />

        <div className='container grid grid-cols-1 md:grid-cols-2 gap-32 md:gap-16 py-20'>
          <div className='flex flex-col h-full justify-between'>
            <div>
              <h2 className='text-xl font-bold text-white mb-2'>Contact Us</h2>

              <h1 className='text-4xl font-bold text-white mb-6'>
                {page.title?.rendered.replace('&#8230;', '.')}
              </h1>

              <PageContent
                content={page.acf?.hero_area_content[0]?.content}
                color='white'
                className='mb-24'
              />
            </div>

            <div>
              <div className='bg-black bg-opacity-40 p-6 flex gap-4 mb-4'>
                <Icon icon='location_white' size={24} />

                <div>
                  <h4
                    className='text-white font-bold mb-2'
                    style={{ fontSize: '24px' }}
                  >
                    Digital Health Insights Location
                  </h4>
                  <p className='text-white text-lg'>{page.acf?.address}</p>
                </div>
              </div>

              <div className='bg-black bg-opacity-50 p-6 flex gap-4'>
                <Icon icon='phone_white' size={24} />

                <div>
                  <p
                    className='text-white font-bold'
                    style={{ fontSize: '24px' }}
                  >
                    {page.acf?.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  /**
   * Page Content
   */
  const PAGE_ID = 139
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
