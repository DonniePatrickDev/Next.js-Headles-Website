import HTMLContent from '@/components/atoms/HTMLContent'
import Ad from '@/components/molecules/Ad'
import InsightSocial from '@/components/molecules/InsightSocial'
import SidebarSubscribe from '@/components/molecules/SidebarSubscribe'
import styles from './PostBody.module.scss'

export default function PostBody({ post, category }) {
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className='flex-initial w-full md:w-3/4'>
          <Ad
            ad_image={category.acf?.ad_top?.ad_image}
            ad_link={category.acf?.ad_top?.ad_link}
            classes={category.acf?.ad_top?.ad_tracking_classes}
          />

          <div className={styles.content}>
            <HTMLContent content={post.content?.rendered} />
          </div>

          <InsightSocial
            slug={post.slug}
            title={post.title?.rendered.replace('&#8230;', '.')}
            type='news'
          />
        </div>

        <div className='flex-initial w-full md:w-1/4'>
          <SidebarSubscribe />
        </div>
      </div>
    </div>
  )
}
