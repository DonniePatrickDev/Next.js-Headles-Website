import Layout from '@/components/common/Layout'
import Ad from '@/components/molecules/Ad'
import ExploreAnalytics from '@/components/organisms/ExploreAnalytics'
import FeaturedGrid from '@/components/organisms/FeaturedGrid'
import HomeHero from '@/components/organisms/HomeHero'
import PostsLatest from '@/components/organisms/PostsLatest'
import HtmlParser from 'html-react-parser'

export default function HomePage({
  page,
  primaryPost,
  latestPosts,
  featuredInsights,
  pinnedPost,
}) {
  const { yoast_head } = page

  let lastPostItemsCount
  if (pinnedPost.length >= 1) {
    let pinnedPostItems = pinnedPost.length
    let latestPostsItem = 5 - pinnedPostItems

    const pinneAreaLatestPost = latestPosts.slice(0, latestPostsItem)

    pinnedPost = pinnedPost.concat(pinneAreaLatestPost)

    lastPostItemsCount = latestPostsItem
  } else {
    pinnedPost = latestPosts.slice(0, 5)
  }

  let getFinalLatestPosts = latestPosts.slice(0, 10)

  //remove pinnedPost from getFinalLatestPosts

  const pinnedPostIDS = pinnedPost.map((item) => item.id)

  getFinalLatestPosts = getFinalLatestPosts.filter(
    (item) => !pinnedPostIDS.includes(item.id)
  )

  let latestPostsB = getFinalLatestPosts.slice(0, 4)

  let pinnedfeaturedInsights = featuredInsights.filter(
    (post) => post.acf.home_featured_grid === '1'
  )
  if (pinnedfeaturedInsights && pinnedfeaturedInsights.length >= 1) {
    //should be 3 or less
    let pinLen = pinnedfeaturedInsights.length
    if (pinLen !== 0) {
      let openSpots = 4 - pinLen
      //need to remove any pinnedfeaturedInsights, from featureinsight
      featuredInsights = featuredInsights.filter((e) =>
        pinnedfeaturedInsights.indexOf(e) > -1 ? false : true
      )
      featuredInsights = featuredInsights.slice(0, openSpots)
      featuredInsights = pinnedfeaturedInsights.concat(featuredInsights)
    }
  } else {
    featuredInsights.slice(0, 4)
  }

  return (
    <Layout seo={HtmlParser(yoast_head)}>
      <HomeHero primaryPost={primaryPost} heroNews={pinnedPost} />

      <Ad
        ad_image={page.acf?.ad_top?.ad_image}
        ad_link={page.acf?.ad_top?.ad_link}
        classes={page.acf?.ad_top?.ad_tracking_classes}
      />

      <ExploreAnalytics />

      <FeaturedGrid posts={featuredInsights} type='insight' />

      <Ad
        ad_image={page.acf?.ad_mid?.ad_image}
        ad_link={page.acf?.ad_mid?.ad_link}
        classes={page.acf?.ad_mid?.ad_tracking_classes}
      />

      <PostsLatest
        page={page}
        posts={latestPostsB}
        type='news'
        linkTitle='Read News'
      />
    </Layout>
  )
}

export async function getStaticProps() {
  /**
   * Page Content
   */
  const PAGE_ID = 5
  const res = await fetch(
    `https://dhix.dhinsights.org/wp-json/wp/v2/pages/${PAGE_ID}`
  )
  const page = await res.json()

  // Pinned Posts Starts
  const pinnedPostResIds = await fetch(
    'https://dhix.dhinsights.org/wp-json/pinnedposts/v1/data'
  )
  const pinnedPostIds = await pinnedPostResIds.json() // Get Pinned Posts Ids

  let pinnedPost
  if (pinnedPostIds.response.length > 0) {
    const Ids = pinnedPostIds.response.toString()

    const response = await fetch(
      `https://dhix.dhinsights.org/wp-json/wp/v2/posts?include=${Ids}`
    )
    const pinnedPResult = await response.json()

    pinnedPost = sortPostsByPriority(pinnedPResult)
  } else {
    pinnedPost = []
  }

  function sortPostsByPriority(myData) {
    for (var i = 0; i < myData.length; i++) {
      for (var j = 0; j < myData.length - i - 1; j++) {
        if (myData[j].acf.priority > myData[j + 1].acf.priority) {
          var temp = myData[j]
          myData[j] = myData[j + 1]
          myData[j + 1] = temp
        }
      }
    }
    return myData
  }

  // Pinned Posts End

  const SPONSORED_CATEGORY = 233
  await Promise.all(
    pinnedPost.map(async (element) => {
      if (element.categories.length > 1) {
        element.categories.forEach((cat) => {
          if (cat === SPONSORED_CATEGORY) {
            element.categories[0] = SPONSORED_CATEGORY
          }
        })
      }

      const getCategory = await fetch(
        `https://dhix.dhinsights.org/wp-json/wp/v2/categories/${element.categories[0]}`
      )
      const cat = await getCategory.json()
      element.categoryName = cat.name
    })
  )

  /**
   * Primary Post
   */
  const POST_PRIMARY = page.acf?.featured_article
    ? page.acf?.featured_article
    : '750'
  const primaryPostRes = await fetch(
    `https://dhix.dhinsights.org/wp-json/wp/v2/posts/${POST_PRIMARY}`
  )
  const primaryPost = await primaryPostRes.json()

  /**
   * Recent News
   */

  const latestPostsRes = await fetch(
    `https://dhix.dhinsights.org/wp-json/wp/v2/posts?filter[orderby]=date&order=desc&exclude=${POST_PRIMARY}`
  )
  const latestPosts = await latestPostsRes.json()
  await Promise.all(
    latestPosts.map(async (element) => {
      if (element.categories.length > 1) {
        element.categories.forEach((cat) => {
          if (cat === SPONSORED_CATEGORY) {
            element.categories[0] = SPONSORED_CATEGORY
          }
        })
      }

      const getCategory = await fetch(
        `https://dhix.dhinsights.org/wp-json/wp/v2/categories/${element.categories[0]}`
      )
      const cat = await getCategory.json()
      element.categoryName = cat.name
    })
  )

  /**
   * Featured Insights
   */

  // pull in webinar results and merge json
  const TOPIC_FEATURED = 45
  const TYPE_WHITEPAPER = 190
  const TYPE_WEBINAR = 19

  const featuredNewsWhitePaperRes = await fetch(
    `https://dhix.dhinsights.org/wp-json/wp/v2/insight?topic=${TOPIC_FEATURED}&insight_type=${TYPE_WHITEPAPER}&exclude=${POST_PRIMARY}`
  )
  const featuredInsightsWhitePaper = await featuredNewsWhitePaperRes.json()

  const featuredNewsWebinarRes = await fetch(
    `https://dhix.dhinsights.org/wp-json/wp/v2/insight?topic=${TOPIC_FEATURED}&insight_type=${TYPE_WEBINAR}&exclude=${POST_PRIMARY}`
  )
  const featuredInsightsWebinar = await featuredNewsWebinarRes.json()

  const featuredInsights = featuredInsightsWhitePaper.concat(
    featuredInsightsWebinar
  )

  return {
    props: {
      page,
      primaryPost,
      latestPosts: latestPosts,
      featuredInsights: featuredInsights,
      pinnedPost,
    },
    revalidate: 10,
  }
}
