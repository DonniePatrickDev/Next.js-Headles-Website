import { useEffect, useState } from 'react'
import styles from './PostsAll.module.scss'
import SidebarSubscribe from '@/components/molecules/SidebarSubscribe'
import Button from '@/components/atoms/Button'
import { getPosts } from '@/functions/wordpress/fetchData'
import Ad from '@/components/molecules/Ad'
import PostCard from '@/components/molecules/PostCard'

export default function PostsAll() {
  const [page, setPage] = useState(1)
  const [isEnd, setIsEnd] = useState(false)
  const [posts, setPosts] = useState([])

  const { data, loading } = getPosts(page)

  useEffect(() => {
    if (data && Array.isArray(data)) {
      if (data.length === 0) {
        setIsEnd(true)
      } else {
        setPosts([...posts, ...data])
      }
    }
  }, [data])

  return (
    <div className='container my-16'>
      <div className='flex flex-col md:flex-row gap-8 lg:gap-16 w-full'>
        <div className='flex-initial w-full md:w-3/4'>
          <h3 className={styles.title}>The Latest</h3>

          {Array.isArray(posts) &&
            posts.map((post, index) => (
              <div className={styles.cardWrap} key={index}>
                <div className={styles.card}>
                  <PostCard
                    post={post}
                    link={`/news/${post.slug}`}
                    linkText='Read News'
                  />
                </div>
              </div>
            ))}

          <div className='text-center pt-4 pb-8'>
            <Button
              text='Load more News'
              type='primary'
              size='lg'
              onClick={() => setPage(page + 1)}
              disabled={isEnd || loading}
            />
          </div>
        </div>

        <div className='flex-initial w-full md:w-1/4'>
          <SidebarSubscribe />

          <div className='mb-4 p-4'>
            <Ad
              type='square'
              ad_image={page.acf?.ad_side?.ad_image}
              ad_link={page.acf?.ad_side?.ad_link}
              classes={page.acf?.ad_side?.ad_tracking_classes}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
