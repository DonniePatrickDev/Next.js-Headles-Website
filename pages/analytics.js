import HtmlParser from 'html-react-parser'
import Layout from '@/components/common/Layout'
import FeaturedPosts from '@/components/organisms/FeaturedPosts'
import MostWiredHero from '@/components/organisms/MostWiredHero'
import MostWiredPanels from '@/components/organisms/MostWiredPanels'
import MostWiredBottom from '@/components/organisms/MostWiredBottom'

export default function MostWiredPage({ page, featuredInsights }) {
  const breadcrumbs = [
    { icon: 'home_white', text: 'Back to Home', url: '/' },
    {
      text: 'Digital Health Analytics',
      url: `/analytics`,
    },
  ]

  const { yoast_head } = page

  return (
    <Layout seo={HtmlParser(yoast_head)}>
      <MostWiredHero breadcrumbs={breadcrumbs} />

      <MostWiredPanels />

      <FeaturedPosts posts={featuredInsights} type='market-insights' />

      <MostWiredBottom />
    </Layout>
  )
}

export async function getStaticProps() {
  /**
   * Page Content
   */
  const PAGE_ID = 1184
  const res = await fetch(
    `https://dhix.dhinsights.org/wp-json/wp/v2/pages/${PAGE_ID}`
  )
  const page = await res.json()

  /**
   * Featured Insights
   */
  const TOPIC_FEATURED = 251
  const featuredMarketInsightsRes = await fetch(
    `https://dhix.dhinsights.org/wp-json/wp/v2/market_insights?market_insight_topics=${TOPIC_FEATURED}`
  )
  const featuredMarketInsights = await featuredMarketInsightsRes.json()

  return {
    props: {
      page,
      featuredInsights: featuredMarketInsights.slice(0, 3),
    },
    revalidate: 10,
  }
}
