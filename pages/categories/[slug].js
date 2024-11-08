import HtmlParser from 'html-react-parser'
import Breadcrumbs from '@/components/atoms/Breadcrumbs'
import Layout from '@/components/common/Layout'
import FeaturedPosts from '@/components/organisms/FeaturedPosts'
import Divider from '@/components/atoms/Divider/Divider'
import { unEntity } from '@/functions/wordpress/util'
import Ad from '@/components/molecules/Ad'
import TwoColumnHero from '@/components/organisms/TwoColumnHero'
import PostsCategory from '@/components/organisms/PostsCategory'

export default function HomePage({ category, featuredInsights, community }) {
  const breadcrumbs = [
    { icon: 'home', text: 'Back to Home', url: '/' },
    { text: 'All News', url: '/news' },
    { text: category.name, url: `/categories/${category.slug}` },
  ]

  const { yoast_head } = category
  //First we get the category Name and do a switchcase, to determine
  let type = 0;
  switch (category.name) {
    case 'Clinical Care Delivery':
      type = 46;
      break;
    case 'Cloud Agility':
      type = 228;
      break;
    case 'Cybersecurity':
      type = 229;
      break;
    case 'Digital Transformation':
      type = 220;
      break;
    case 'Interoperability':
      type = 239;
      break;
    default:
      type = 0;
  }
  //loop through each insight , check if its the same type

  //featuredInsights = featuredInsights.filter(idvInsight => idvInsight.topic.indexOf(type) > -1).slice(0, 3)

  let pinnedfeaturedInsights = featuredInsights.filter(post => post.acf.footer_insight === "1")
  //list of sponsored featured insights that are pinned, we take latest 3 pinned
  pinnedfeaturedInsights = pinnedfeaturedInsights.filter(idvInsight => idvInsight.acf.ins_cat.indexOf(type) > -1).slice(0, 3)
  // list of sponsored insights; take all, to be limited to 3 later
  featuredInsights = featuredInsights.filter(idvInsight => idvInsight.topic.indexOf(type) > -1)

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



  return (
    <Layout seo={HtmlParser(yoast_head)}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <Ad
        ad_image={category.acf?.ad_top?.ad_image}
        ad_link={category.acf?.ad_top?.ad_link}
        classes={category.acf?.ad_top?.ad_tracking_classes}
      />

      <TwoColumnHero
        title={unEntity(category.name)}
        excerpt={category.description}
        showCard={false}
      />

      <PostsCategory category={category} community={community} />

      <Divider color='purple' className='container' />

      <FeaturedPosts posts={featuredInsights} type='insight' />

      <Divider color='purple' className='container' />

      <div className='container py-16'>
        <Ad
          type='thin'
          ad_image={category.acf?.ad_bottom?.ad_image}
          ad_link={category.acf?.ad_bottom?.ad_link}
          classes={category.acf?.ad_bottom?.ad_tracking_classes}
        />
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch(
    'https://dhix.dhinsights.org/wp-json/wp/v2/categories/?_fields=slug&per_page=100'
  )
  const categories = await res.json()

  const paths = categories.map((category) => ({
    params: { slug: category.slug },
  }))

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  /**
   * Category
   */
  const categoryRes = await fetch(
    `https://dhix.dhinsights.org/wp-json/wp/v2/categories/?slug=${params.slug}`
  )
  const category = await categoryRes.json()

  /**
   * Featured Insights
   */
  // ONLY insights that have topic sponsored will appear here
  const TOPIC_FEATURED = 45
  const featuredInsightsRes = await fetch(
    `https://dhix.dhinsights.org/wp-json/wp/v2/insight?topic=${TOPIC_FEATURED}`
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
  //old Menu url https://www.dhinsights.org/categories/interoperability
  return {
    props: {
      category: category[0],
      featuredInsights: featuredInsights,
      community,
    },
    revalidate: 10,
  }
}
