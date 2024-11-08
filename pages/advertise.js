import HtmlParser from 'html-react-parser'
import Layout from '@/components/common/Layout'
import AdvertiseHero from '@/components/organisms/AdvertiseHero'
import AdvertiseTrends from '@/components/organisms/AdvertiseTrends'
import AdvertisePanels from '@/components/organisms/AdvertisePanels'

export default function AdvertisePage({ page }) {
  const breadcrumbs = [
    { icon: 'home_white', text: 'Back to Home', url: '/' },
    {
      text: 'Advertise & Sponsorships',
      url: `/advertise`,
    },
  ]

  const { yoast_head } = page

  return (
    <Layout seo={HtmlParser(yoast_head)}>
      <AdvertiseHero
        breadcrumbs={breadcrumbs}
        description='Reach over 84,000 healthcare professionals working in large hospital systems, community & rural hospitals, integrated delivery networks, physician practices, clinics, long-term care facilities, and more.'
      />

      <AdvertiseTrends />

      <AdvertisePanels />
    </Layout>
  )
}

export async function getStaticProps() {
  /**
   * Page Content
   */
  const PAGE_ID = 167
  const res = await fetch(
    `https://dhix.dhinsights.org/wp-json/wp/v2/pages/${PAGE_ID}`
  )
  const page = await res.json()

  /**
   * Featured Insights
   */
  const featuredInsightsRes = await fetch(
    'https://dhix.dhinsights.org/wp-json/wp/v2/insight?topic=4,5,32'
  )
  const featuredInsights = await featuredInsightsRes.json()

  return {
    props: {
      page,
      featuredInsights: featuredInsights.slice(0, 3),
    },
    revalidate: 10,
  }
}
