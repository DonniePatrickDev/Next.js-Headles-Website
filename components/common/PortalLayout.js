import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'
import PortalHeader from '../organisms/PortalHeader'
import PortalSideNav from '../organisms/PortalSideNav'
import PortalFooter from '../organisms/PortalFooter'
import Loading from '../atoms/Loading'

export default function PortalLayout({ children }) {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status === 'authenticated') {
    if (session?.accessTokenExpires < new Date().getTime()) {
      signOut()
    } else {
      return (
        <>
          <PortalHeader />
          <main id='page-content'>
            <div className='flex'>
              <div id='sideNav' className='w-0 xl:w-auto'>
                <PortalSideNav />
              </div>
              <div id='portal' className='bg-gray-100 min-h-full w-full py-16'>
                <div className='container'>{children}</div>
              </div>
            </div>
          </main>
          <PortalFooter />
        </>
      )
    }
  } else if (status === 'unauthenticated') {
    router.push('/portal/')
  }

  return (
    <>
      <PortalHeader />
      <main id='page-content'>
        <div className='flex'>
          <Loading />
        </div>
      </main>
      <PortalFooter />
    </>
  )
}
