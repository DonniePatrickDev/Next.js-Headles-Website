import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'
import cn from 'classnames'
import Background from '@/components/atoms/Background'
import Button from '@/components/atoms/Button'
import Image from '@/components/atoms/Image'
import Layout from '@/components/common/Layout'
import SignInForm from '@/components/molecules/SignInForm'
import Loading from '@/components/atoms/Loading'

export default function Page() {
  const router = useRouter()
  const { commercial } = router.query

  const { data: session, status } = useSession()

  if (status === 'authenticated') {
    if (session?.accessTokenExpires < new Date().getTime()) {
      signOut()
    } else {
      router.push('/portal/projects/')
    }
  } else if (status === 'unauthenticated') {
    return (
      <Layout newsletter={false}>
        <div className={cn('relative', commercial === 'true' && 'hidden')}>
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
                  Get Access to DHA
                </h1>

                <h3 className='text-2xl font-bold text-white mb-6'>
                  For Vendors and Providers
                </h3>

                {/* <p className='text-white mb-5'>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been.
                </p> */}
              </div>

              <Button
                text='Contact us to Register or Get Access'
                href='/contact'
                type='tertiary'
                size='lg'
              />
            </div>

            <div className='md:pt-12'>
              <SignInForm commercial={commercial} />
            </div>
          </div>
        </div>

        <div className={cn(commercial === 'true' ? '' : 'hidden')}>
          <Loading />
        </div>
      </Layout>
    )
  }

  return (
    <Layout newsletter={false}>
      <Loading />
    </Layout>
  )
}
