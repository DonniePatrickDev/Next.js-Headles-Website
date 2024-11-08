import HtmlParser from 'html-react-parser'
import Breadcrumbs from '@/components/atoms/Breadcrumbs'
import Layout from '@/components/common/Layout'
import Ad from '@/components/molecules/Ad'
import TwoColumnHero from '@/components/organisms/TwoColumnHero'
import InsightsAll from '@/components/organisms/InsightsAll'

export default function NewsPage({ page, primaryPost }) {
  const breadcrumbs = [
    { icon: 'home', text: 'Back to Home', url: '/' },
    { text: 'All Insights', url: '/insight' },
  ]

  const { yoast_head } = page

  return (
    <Layout seo={HtmlParser(yoast_head)}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <TwoColumnHero
        title='View all Insights'
        excerpt={page.acf?.page_description}
        post={primaryPost}
        hideAd={true}
        postLink={`/insight/${primaryPost.slug}`}
      />

      <Ad
        ad_image={page.acf?.ad?.ad_image}
        ad_link={page.acf?.ad?.ad_link}
        classes={page.acf?.ad?.ad_tracking_classes}
      />

      <InsightsAll />
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
    'https://dhix.dhinsights.org/wp-json/wp/v2/insight?filter[orderby]=date&order=desc&per_page=5'
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
