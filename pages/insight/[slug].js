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
import { set } from 'lodash'

export default function InsightPage({ insight, topic, featuredInsights }) {

  const author = insight.author
  let pinnedfeaturedInsights = featuredInsights.filter(post => post.acf.footer_insight === "1")
  //list of sponsored featured insights that are pinned, we take latest 3 pinned
  pinnedfeaturedInsights = pinnedfeaturedInsights.filter(idvInsight => idvInsight.author === author).slice(0, 3)
  // list of sponsored insights; take all, to be limited to 3 later
  featuredInsights = featuredInsights.filter(idvInsight => idvInsight.author === author)

  if (pinnedfeaturedInsights && pinnedfeaturedInsights.length >= 1) {
    //should be 3 or less
    let pinLen = pinnedfeaturedInsights.length
    if (pinLen !== 0) {
      let openSpots = 3 - pinLen
      //need to remove any pinnedfeaturedInsights, from featureinsight
      featuredInsights = featuredInsights.filter(e => pinnedfeaturedInsights.indexOf(e) > -1 ? false : true);
      featuredInsights = featuredInsights.slice(0, openSpots)
      featuredInsights = pinnedfeaturedInsights.concat(featuredInsights);
    }
  } else {
    featuredInsights.slice(0, 3)
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
      { icon: 'home_white', text: 'Back to Home', url: '/' },
      { text: 'All Insights', url: '/insight' },
      {
        text: insight.title?.rendered.replace('&#8230;', '.'),
        url: `/insight/${insight.slug}`,
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

        <FeaturedPosts posts={featuredInsights} type='insight' />
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
  const TOPIC_FEATURED = 45
  const featuredInsightsRes = await fetch(
    `https://dhix.dhinsights.org/wp-json/wp/v2/insight?topic=${TOPIC_FEATURED}`
  )
  let featuredInsights = await featuredInsightsRes.json()

  /**
   * GetInsight
   */
  const insightRes = await fetch(
    `https://dhix.dhinsights.org/wp-json/wp/v2/insight/?slug=${params.slug}`
  )
  const insight = await insightRes.json()
  const author = insight.author

  const topicId = insight[0]?.topic[0]
  const topicRes = await fetch(
    `https://dhix.dhinsights.org/wp-json/wp/v2/topic/${topicId}`
  )
  const topic = await topicRes.json()

  if (insight[0]) {
    return {
      props: {
        insight: insight[0],
        topic,
        featuredInsights: featuredInsights,
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
      `https://dhix.dhinsights.org/wp-json/wp/v2/insight/${params.slug}`,
      {
        headers: myHeaders,
      }
    )
    const preview = await previewRes.json()

    const topicId = preview?.topic[0]
    const topicRes = await fetch(
      `https://dhix.dhinsights.org/wp-json/wp/v2/topic/${topicId}`
    )
    const topic = await topicRes.json()

    return {
      props: {
        insight: preview,
        topic,
        featuredInsights: featuredInsights,
      },
    }
  }
}

export async function getStaticPaths() {
  const res = await fetch(
    'https://dhix.dhinsights.org/wp-json/wp/v2/insight/?_fields=slug&per_page=100'
  )
  const insights = await res.json()

  const paths = insights.map((insight) => ({
    params: { slug: insight.slug },
  }))

  return { paths, fallback: 'blocking' }
}
