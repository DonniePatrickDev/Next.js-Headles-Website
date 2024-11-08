import HtmlParser from 'html-react-parser'
import Breadcrumbs from '@/components/atoms/Breadcrumbs'
import Layout from '@/components/common/Layout'
import Ad from '@/components/molecules/Ad'
import TwoColumnHero from '@/components/organisms/TwoColumnHero'
import PostsAll from '@/components/organisms/PostsAll'

export default function NewsPage({ page, primaryPost }) {
  const breadcrumbs = [
    { icon: 'home', text: 'Back to Home', url: '/' },
    { text: 'All News', url: '/news' },
  ]

  const { yoast_head } = page

  return (
    <Layout seo={HtmlParser(yoast_head)}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <TwoColumnHero
        title='View all News'
        excerpt={page.acf?.page_description}
        post={primaryPost}
        postLink={`/news/${primaryPost.slug}`}
        hideAd={true}
      />

      <Ad
        ad_image={page.acf?.ad?.ad_image}
        ad_link={page.acf?.ad?.ad_link}
        classes={page.acf?.ad?.ad_tracking_classes}
      />

      <PostsAll />
    </Layout>
  )
}

export async function getStaticProps() {
  /**
   * Page Content
   */
  const PAGE_ID = 1100
  const res = await fetch(
    `https://dhix.dhinsights.org/wp-json/wp/v2/pages/${PAGE_ID}`
  )
  const page = await res.json()

  /**
   * Primary News
   */
  const postsRes = await fetch(
    'https://dhix.dhinsights.org/wp-json/wp/v2/posts?filter[orderby]=date&order=desc&per_page=5'
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
