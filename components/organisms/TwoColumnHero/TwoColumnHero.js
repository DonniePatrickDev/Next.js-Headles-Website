import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './TwoColumnHero.module.scss'
import HeroCard from '@/components/molecules/HeroCard'

export default function TwoColumnHero({
  title,
  excerpt,
  showCard,
  post,
  postLink,
  hideAd,
}) {
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div
          className={cn('w-full', showCard && post ? 'md:w-5/12' : 'md:w-1/2')}
        >
          <h1 className='text-5xl text-purple-dark font-bold mb-4'>{title}</h1>
          <h3 className='text-xl text-purple-dark'>{excerpt}</h3>
        </div>

        {!hideAd && showCard && post && (
          <div className='w-full md:w-7/12 flex flex-col md:flex-row'>
            <HeroCard post={post} link={postLink} linkText='' />
          </div>
        )}
      </div>
    </div>
  )
}

TwoColumnHero.propTypes = {
  title: PropTypes.string,
  excerpt: PropTypes.string,
  showCard: PropTypes.bool,
  hideAd: PropTypes.bool,
  post: PropTypes.object,
  postLink: PropTypes.string,
}

TwoColumnHero.defaultProps = {
  showCard: true,
  hideAd: false
}
