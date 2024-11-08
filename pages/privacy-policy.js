import HtmlParser from 'html-react-parser'
import Background from '@/components/atoms/Background'
import Breadcrumbs from '@/components/atoms/Breadcrumbs'
import HTMLContent from '@/components/atoms/HTMLContent'
import Layout from '@/components/common/Layout'

export default function PrivacyPolicyPage({ page }) {
  const breadcrumbs = [
    { icon: 'home_white', text: 'Back to Home', url: '/' },
    {
      text: 'Privacy Policy',
      url: `/privacy-policy`,
    },
  ]

  const { yoast_head } = page

  return (
    <Layout seo={HtmlParser(yoast_head)} newsletter={true}>
      <div className='relative'>
        <div className='absolute w-full h-full pb-12 -z-10'>
          <Background image='most_wired_hero' />
        </div>

        <Breadcrumbs breadcrumbs={breadcrumbs} color='white' />

        <div className='container pb-12'>
          <h1 className='text-2xl md:text-4xl text-white font-bold mb-3'>
            Privacy Policy
          </h1>
        </div>
      </div>

      <div className='container py-12'>
        <HTMLContent content={page?.content?.rendered} />
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  /**
   * Page Content
   */
  const PAGE_ID = 128
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
