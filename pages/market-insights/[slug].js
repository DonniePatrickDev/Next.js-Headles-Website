import Head from 'next/head'
import DefaultErrorPage from 'next/error'
import HtmlParser from 'html-react-parser'
import { useEffect, useState } from 'react'
import Layout from '@/components/common/Layout'
import FeaturedPosts from '@/components/organisms/FeaturedPosts'
import InsightBody from '@/components/organisms/InsightBody'
import InsightHero from '@/components/organisms/InsightHero'
import { useCookies } from 'react-cookie'
import InsightFeaturedHero from '@/components/organisms/InsightFeaturedHero'
import InsightHeroUnGated from '@/components/organisms/InsightHeroUnGated'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function InsightPage({ insight, topic, featuredInsights }) {
  const router = useRouter()

  const { data: session } = useSession()
  const level = session?.membership?.level

  if (level && !level.includes('plus') && insight?.acf?.is_premium) {
    router.push('/portal/membership/market-research-upgrade')
  }

  if (insight.title) {
    const [cookie] = useCookies(['subscribed'])
    const [subscribed, setSubscribed] = useState(false)

    useEffect(() => {
      if (cookie.subscribed === 'true') {
        setSubscribed(true)
      }
    }, [cookie])

    const breadcrumbs = [
      { icon: 'home_white', text: 'Back to Home', url: '/analytics' },
      { text: 'All Market Insights', url: '/market-insights' },
      {
        text: insight.title?.rendered.replace('&#8230;', '.'),
        url: `/market-insights/${insight.slug}`,
      },
    ]

    const { yoast_head } = insight

    return (
      <Layout seo={HtmlParser(yoast_head)}>
        {insight?.acf?.login_required === '1' ? (
          subscribed ? (
            <>
              <InsightHeroUnGated article={insight} breadcrumbs={breadcrumbs} />
              <InsightBody
                article={insight}
                topic={topic}
                subscribed={subscribed}
              />
            </>
          ) : (
            <>
              <InsightHero article={insight} breadcrumbs={breadcrumbs} />
              <InsightBody
                article={insight}
                topic={topic}
                subscribed={subscribed}
              />
            </>
          )
        ) : (
          <>
            <InsightFeaturedHero article={insight} breadcrumbs={breadcrumbs} />
            <InsightBody article={insight} topic={topic} subscribed={true} />
          </>
        )}

        <FeaturedPosts posts={featuredInsights} type='market-insights' />
      </Layout>
    )
  } else {
    return (
      <>
        <Head>
          <meta name='robots' content='noindex' />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    )
  }
}

export async function getStaticProps({ params }) {
  /**
   * Featured Insights
   */
  const TOPIC_FEATURED = 251
  const featuredInsightsRes = await fetch(
    `https://dhix.dhinsights.org/wp-json/wp/v2/market_insights?market_insight_topics=${TOPIC_FEATURED}`
  )
  const featuredInsights = await featuredInsightsRes.json()

  /**
   * Insight
   */
  const insightRes = await fetch(
    `https://dhix.dhinsights.org/wp-json/wp/v2/market_insights/?slug=${params.slug}`
  )
  const insight = await insightRes.json()

  const topicId = insight[0]?.market_insight_topics[0]
  const topicRes = await fetch(
    `https://dhix.dhinsights.org/wp-json/wp/v2/market_insight_topics/${topicId}`
  )
  const topic = await topicRes.json()

  if (insight[0]) {
    return {
      props: {
        insight: insight[0],
        topic,
        featuredInsights: featuredInsights.slice(0, 3),
      },
      revalidate: 10,
    }
  } else {
    // Get Preview Token
    var FormData = require('form-data')
    const PREVIEW_USERNAME = process.env.NEXT_PUBLIC_PREVIEW_USERNAME
    const PREVIEW_PASSWORD = process.env.NEXT_PUBLIC_PREVIEW_SECRET

    var formdata = new FormData()
    formdata.append('username', PREVIEW_USERNAME)
    formdata.append('password', PREVIEW_PASSWORD)

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    }

    const authRes = await fetch(
      process.env.NEXTAUTH_API_URL + '/token',
      requestOptions
    )
    const { token } = await authRes.json()

    var myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${token}`)

    const previewRes = await fetch(
      `https://dhix.dhinsights.org/wp-json/wp/v2/market_insights/${params.slug}`,
      {
        headers: myHeaders,
      }
    )
    const preview = await previewRes.json()

    const topicId = preview?.market_insight_topics[0]
    const topicRes = await fetch(
      `https://dhix.dhinsights.org/wp-json/wp/v2/market_insight_topics/${topicId}`
    )
    const topic = await topicRes.json()

    return {
      props: {
        insight: preview,
        topic,
        featuredInsights: featuredInsights.slice(0, 3),
      },
    }
  }
}

export async function getStaticPaths() {
  const res = await fetch(
    'https://dhix.dhinsights.org/wp-json/wp/v2/market_insights/?_fields=slug&per_page=100'
  )
  const insights = await res.json()

  const paths = insights.map((insight) => ({
    params: { slug: insight.slug },
  }))

  return { paths, fallback: 'blocking' }
}
