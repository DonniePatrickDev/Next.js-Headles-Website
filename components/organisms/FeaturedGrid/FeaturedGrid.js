import FeaturedCard from '@/components/molecules/FeaturedCard'

export default function FeaturedGrid({ posts, type }) {
  return (
    <>
      <div>
        <h2 className='text-xl text-purple-dark font-bold uppercase text-center mb-6'>
          Resources
        </h2>
      </div>
      <div className='container my-8'>
        <div className='md:flex flex-col md:flex-row'>
          <div className='md:w-2/3 mb-6 md:mr-3'>
            {posts[0] && (
              <FeaturedCard
                post={posts[0]}
                link={`/${type}/${posts[0].slug}`}
                linkText='Read Report'
              />
            )}
          </div>

          <div className='md:w-1/3 mb-6 md:ml-3'>
            {posts[1] && (
              <FeaturedCard
                post={posts[1]}
                link={`/${type}/${posts[1].slug}`}
                showImage={false}
                linkText='Read Report'
              />
            )}
          </div>
        </div>

        <div className='md:flex flex-col md:flex-row mb-6'>
          <div className='md:w-1/3 mb-6 md:mr-3'>
            {posts[2] && (
              <FeaturedCard
                post={posts[2]}
                link={`/${type}/${posts[2].slug}`}
                showImage={false}
                linkText='Read Report'
              />
            )}
          </div>

          <div className='md:w-2/3 mb-6 md:ml-3'>
            {posts[3] && (
              <FeaturedCard
                post={posts[3]}
                link={`/${type}/${posts[3].slug}`}
                linkText='Read Report'
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}