import HtmlParser from 'html-react-parser'
import Background from '@/components/atoms/Background'
import Breadcrumbs from '@/components/atoms/Breadcrumbs'
import Image from '@/components/atoms/Image'
import Layout from '@/components/common/Layout'

export default function AboutPage({ page }) {
  const breadcrumbs = [
    { icon: 'home_white', text: 'Back to Home', url: '/' },
    {
      text: 'About Us',
      url: `/about`,
    },
  ]

  const { yoast_head } = page

  return (
    <Layout seo={HtmlParser(yoast_head)}>
      <div className='relative'>
        <div className='absolute w-full h-full pb-12 -z-10'>
          <Background image='most_wired_hero' />
        </div>

        <Breadcrumbs breadcrumbs={breadcrumbs} color='white' />

        <div className='container mb-6 pb-12'>
          <h1 className='text-2xl md:text-5xl text-white font-bold mt-6 mb-3 text-center'>
            About Us
          </h1>
        </div>
      </div>

      <div className='container mb-12'>
        <div className='mb-10 text-center max-w-2xl mx-auto'>
          <p className='text-2xl font-semibold mt-16'>
            The X in our brand represents the exponential effect of how
            communities, analysis, and insights can drive organizations to new
            levels of performance, understanding, and outcomes.
          </p>
        </div>

        <Image
          src='advertise_x_factor'
          width={2569}
          height={1440}
          alt='Trends'
        />
      </div>

      <div className='container py-12'>
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='w-1/4'>
            <Image
              src='dhi_logo_regular_mix'
              href='/'
              width={1686}
              height={675}
            />
          </div>

          <div className='w-3/4 flex flex-col justify-center'>
            <p className='text-xl font-semibold'>
              Digital Health Insights (DHI) delivers actionable information on
              the most pressing issues facing healthcare professionals today.
              DHI delivers analysis, best practices and guidance on how
              healthcare organizations can thrive as they continue driving
              digital transformation within their organizations.
            </p>
          </div>
        </div>
      </div>

      <div className='container py-12'>
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='w-1/4'>
            <Image
              src='dhc_logo_regular_mix'
              href='/'
              width={1686}
              height={675}
            />
          </div>

          <div className='w-3/4 flex flex-col justify-center'>
            <p className='text-xl font-semibold'>
              The Digital Health Community (DHC) provides a secure environment
              for healthcare leaders across the globe to exchange ideas,
              solutions and best practices to further the evolution of
              healthcare as we know it today. DHC sets the standard for
              cross-association collaboration and networking and will work to
              become the world’s largest healthcare professional network.
            </p>
          </div>
        </div>
      </div>

      <div className='container py-12'>
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='w-1/4'>
            <Image
              src='dha_logo_regular_mix'
              href='/'
              width={1765}
              height={675}
            />
          </div>

          <div className='w-3/4 flex flex-col justify-center'>
            <p className='text-xl font-semibold'>
              In 2022, CHIME will supercharge digital health transformation
              capabilities by moving from a one snapshot in time static Most
              Wired survey to a 365/24/7 data and analytics resource with the
              Digital Health Analytics portal. Digital Health Analytics (DHA)
              will be the gateway for provider organizations and companies to
              better understand how digital technology supports leaders in
              transforming health and care and delivering data insights that
              help them make the greatest business impact possible.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  /**
   * Page Content
   */
  const PAGE_ID = 165
  const res = await fetch(
    `https://dhix.dhinsights.org/wp-json/wp/v2/pages/${PAGE_ID}`
  )
  const page = await res.json()

  return {
    props: {
      page,
    },
    revalidate: 10,
  }
}
