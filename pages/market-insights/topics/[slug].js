import HtmlParser from 'html-react-parser'
import Breadcrumbs from '@/components/atoms/Breadcrumbs'
import Layout from '@/components/common/Layout'
import FeaturedPosts from '@/components/organisms/FeaturedPosts'
import Divider from '@/components/atoms/Divider/Divider'
import { unEntity } from '@/functions/wordpress/util'
import Ad from '@/components/molecules/Ad'
import TwoColumnHero from '@/components/organisms/TwoColumnHero'
import MarketInsightTopic from '@/components/organisms/MarketInsightTopic'
import { useSession } from 'next-auth/react'

export default function HomePage({ topic, featuredInsights, community }) {
  const { data: session } = useSession()
  const level = session?.membership?.level

  const breadcrumbs = [
    { icon: 'home', text: 'Back to Home', url: '/analytics' },
    { text: 'All Market Insights', url: '/market-insights' },
    { text: topic.name, url: `/market-insights/topics/${topic.slug}` },
  ]

  const { yoast_head } = topic

  return (
    <Layout seo={HtmlParser(yoast_head)}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <Ad
        ad_image={topic.acf?.ad_top?.ad_image}
        ad_link={topic.acf?.ad_top?.ad_link}
        classes={topic.acf?.ad_top?.ad_tracking_classes}
      />

      <TwoColumnHero
        title={unEntity(topic.name)}
        excerpt={topic.description}
        showCard={false}
      />

      <MarketInsightTopic
        category={topic}
        community={community}
        level={level}
      />

      <Divider color='purple' className='container' />

      <FeaturedPosts posts={featuredInsights} type='market-insights' />

      <Divider color='purple' className='container' />

      <div className='container py-16'>
        <Ad
          type='thin'
          ad_image={topic.acf?.ad_bottom?.ad_image}
          ad_link={topic.acf?.ad_bottom?.ad_link}
          classes={topic.acf?.ad_bottom?.ad_tracking_classes}
        />
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch(
    'https://dhix.dhinsights.org/wp-json/wp/v2/market_insight_topics/?_fields=slug&per_page=100'
  )
  const topics = await res.json()

  const paths = topics.map((topic) => ({
    params: { slug: topic.slug },
  }))

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  /**
   * Topic
   */
  const topicRes = await fetch(
    `https://dhix.dhinsights.org/wp-json/wp/v2/market_insight_topics/?slug=${params.slug}`
  )
  const topic = await topicRes.json()

  /**
   * Featured Insights
   */
  const TOPIC_FEATURED = 251
  const featuredInsightsRes = await fetch(
    `https://dhix.dhinsights.org/wp-json/wp/v2/market_insights?market_insight_topics=${TOPIC_FEATURED}`
  )
  const featuredInsights = await featuredInsightsRes.json()

  let community = ''

  if (params.slug === 'clinical-care-delivery') {
    community =
      'https://mydigitalhealthcommunity.org/communities/Clinical-Care-Delivery/5ea6e5e733e7e3c47410b5fe'
  } else if (params.slug === 'cloud-agility') {
    community =
      'https://mydigitalhealthcommunity.org/communities/Cloud-Agility/61f97f45d1d9f66937088b25'
  } else if (params.slug === 'cybersecurity') {
    community =
      'https://mydigitalhealthcommunity.org/communities/Cybersecurity/5ea6dc0e33e7e3c47410b5ed'
  } else if (params.slug === 'digital-transformation') {
    community =
      'https://mydigitalhealthcommunity.org/communities/Digital-Health-Leadership-and-Transformation/5ea6f42233e7e3c47410b601'
  } else if (params.slug === 'interoperability') {
    community =
      'https://mydigitalhealthcommunity.org/communities/Interoperability/61813e7deacc886c94c5651e'
  }

  return {
    props: {
      topic: topic[0],
      featuredInsights: featuredInsights.slice(0, 3),
      community,
    },
    revalidate: 10,
  }
}
