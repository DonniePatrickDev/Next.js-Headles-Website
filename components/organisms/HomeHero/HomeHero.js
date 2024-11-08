import FeaturedCard from '@/components/molecules/FeaturedCard'
import IconCard from '@/components/molecules/IconCard'
import PostCard from '@/components/molecules/PostCard'
import Button from '@/components/atoms/Button'
import styles from './HomeHero.module.scss'

export default function HomeHero({ primaryPost, heroNews }) {
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className='w-full mb-4'>
            <FeaturedCard
              className={styles.imageStyle}
              post={primaryPost}
              link={`/news/${primaryPost.slug}`}
              linkText=''
              showImage={true}
              bottomBlue={true}
              isHomePage={true}
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className=''>
              <IconCard
                type={1}
                image={{
                  src: 'dha_logo_bold_dark',
                  width: 147,
                  height: 71,
                }}
                background='home_hero_thumb_bg'
                title='The Provider Portal'
                text='Access surveys, analysis, and insights from top digital leaders'
                href='/portal'
              />
            </div>

            <div className=''>
              <IconCard
                type={2}
                image={{
                  src: 'dha_logo_bold_mix',
                  width: 147,
                  height: 71,
                }}
                title='The Vendor Portal'
                text='Your research hub to stay current with market trends and provider needs'
                href='/portal?commercial=true'
              />
            </div>
          </div>
        </div>

        <div className={styles.right}>
          {Array.isArray(heroNews) &&
            heroNews?.map((news, index) => (
              <div className={styles.articleWrap} key={index}>
                <PostCard
                  post={news}
                  link={`/news/${news.slug}`}
                  showExcerpt={false}
                  showButton={false}
                  showCategory={true}
                />
              </div>
            ))}
          <div className='text-center pt-4 pb-8'>
            <Button
              text='Read More'
              type='primary'
              size='lg'
              href='/news'
            />
          </div>
        </div>

      </div>
    </div>
  )
}
