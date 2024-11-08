import Button from '@/components/atoms/Button'
import SidebarSubscribe from '@/components/molecules/SidebarSubscribe'
import Ad from '@/components/molecules/Ad'
import styles from './PostsLatest.module.scss'
import PostCard from '@/components/molecules/PostCard'

export default function PostsLatest({ page, posts, type }) {
  return (
    <div className='container my-16'>
      <div className='flex flex-col md:flex-row gap-8 lg:gap-16 w-full'>
        <div className='flex-initial w-full md:w-3/4'>
          <h3 className={styles.title}>The Latest</h3>

          {posts?.map((post, index) => (
            <div className={styles.cardWrap} key={index}>
              <div className={styles.card}>
                <PostCard
                  post={post}
                  link={`/${type}/${post.slug}`}
                  linkText={`Read ${type}`}
                />
              </div>
            </div>
          ))}

          <Button
            text={`Read all ${type}`}
            href={`/${type}`}
            type='primary'
            size='lg'
            className={styles.allArticlesCta}
          />
        </div>

        <div className='flex-initial w-full md:w-1/4'>
          <div className='mb-4 p-4'>
            <Ad
              type='square'
              ad_image={page.acf?.ad_side_1?.ad_image}
              ad_link={page.acf?.ad_side_1?.ad_link}
              classes={page.acf?.ad_side_1?.ad_tracking_classes}
            />
          </div>

          <div className='mb-8 p-4'>
            <Ad
              type='square'
              ad_image={page.acf?.ad_side_2?.ad_image}
              ad_link={page.acf?.ad_side_2?.ad_link}
              classes={page.acf?.ad_side_2?.ad_tracking_classes}
            />
          </div>

          <SidebarSubscribe />
        </div>
      </div>
    </div>
  )
}
