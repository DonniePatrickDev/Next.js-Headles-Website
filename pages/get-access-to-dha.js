import HtmlParser from 'html-react-parser'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Background from '@/components/atoms/Background'
import Button from '@/components/atoms/Button'
import Image from '@/components/atoms/Image'
import Layout from '@/components/common/Layout'
import SignInForm from '@/components/molecules/SignInForm'
import PageContent from '@/components/organisms/PageContent'

export default function PortalPage({ page }) {
  const router = useRouter()

  const { data: session, status } = useSession()
  useEffect(() => {
    if (session && status === 'authenticated') {
      router.push('/')
    }
  }, [session, status])

  const { yoast_head } = page

  return (
    <Layout seo={HtmlParser(yoast_head)} newsletter={false}>
      <div className='relative'>
        <Background image='access_portal_hero' />

        <div className='container grid grid-cols-1 md:grid-cols-2 gap-32 md:gap-16 py-20'>
          <div className='flex flex-col h-full justify-between items-start'>
            <div>
              <Image
                src='dha_logo_bold_white'
                width={176}
                height={85}
                alt='DHA Analytics'
                className='mb-6'
              />

              <h2 className='text-xl font-bold text-white mb-2'>
                Sign into DHA
              </h2>

              <h1 className='text-4xl font-bold text-white mb-6'>
                {page.title?.rendered.replace('&#8230;', '.')}
              </h1>

              <PageContent
                content={page.acf?.hero_area_content[0]?.content}
                color='white'
                className='mb-12'
              />
            </div>

            <Button
              text='Contact us to Register or Get Access'
              href='/contact'
              type='tertiary'
              size='lg'
            />
          </div>

          <div className='md:pt-12'>
            <SignInForm />
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
  const PAGE_ID = 858
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
