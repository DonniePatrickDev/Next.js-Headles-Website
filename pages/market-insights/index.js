import HtmlParser from 'html-react-parser'
import Breadcrumbs from '@/components/atoms/Breadcrumbs'
import Layout from '@/components/common/Layout'
import TwoColumnHero from '@/components/organisms/TwoColumnHero'
import MarketInsightsAll from '@/components/organisms/MarketInsightsAll'
import { useSession } from 'next-auth/react'

export default function NewsPage({ page, primaryPost }) {
  const { data: session } = useSession()
  const level = session?.membership?.level

  const breadcrumbs = [
    { icon: 'home', text: 'Back to Home', url: '/analytics' },
    { text: 'All Market Insights', url: '/market-insights' },
  ]

  const { yoast_head } = page

  return (
    <Layout seo={HtmlParser(yoast_head)}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <TwoColumnHero
        title='View all Market Insights'
        excerpt={page.acf?.page_description}
        post={primaryPost}
        postLink={`/market-insights/${primaryPost.slug}`}
      />

      <div className='container'>
        <MarketInsightsAll
          // ad_image={page.acf?.ad?.ad_image}
          // ad_link={page.acf?.ad?.ad_link}
          // classes={page.acf?.ad?.ad_tracking_classes}
          level={level}
        />
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  /**
   * Page Content
   */
  const PAGE_ID = 969
  const res = await fetch(
    `https://dhix.dhinsights.org/wp-json/wp/v2/pages/${PAGE_ID}`
  )
  const page = await res.json()

  /**
   * Primary Insight
   */
  const postsRes = await fetch(
    'https://dhix.dhinsights.org/wp-json/wp/v2/market_insights?filter[orderby]=date&order=desc&per_page=5'
  )
  const posts = await postsRes.json()

  return {
    props: {
      page,
      primaryPost: posts[0],
    },
    revalidate: 10,
  }
}
