import PropTypes from 'prop-types'
import styles from './FeaturedPosts.module.scss'
import RecommendationCard from '@/components/molecules/RecommendationCard'
import Divider from '@/components/atoms/Divider/Divider'
import MarketInsightRecommendationCard from '@/components/molecules/MarketInsightRecommendationCard'

export default function FeaturedPosts({ posts, type }) {
  return (
    <div className={styles.root}>
      <Divider color='purple' />

      <h3 className='text-purple-dark text-xl font-bold uppercase my-6'>
        Featured{' '}
        {type === 'market-insights'
          ? 'Market Insights'
          : type === 'insight'
          ? 'Insights'
          : 'News'}
      </h3>

      <div className={styles.inner}>
        {posts?.map((post, index) => (
          <div className={styles.cardWrap} key={index}>
            {type === 'market-insights' ? (
              <MarketInsightRecommendationCard
                post={post}
                link={`/${type}/${post.slug}`}
              />
            ) : (
              <RecommendationCard post={post} link={`/${type}/${post.slug}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

FeaturedPosts.propTypes = {
  articles: PropTypes.array,
}
