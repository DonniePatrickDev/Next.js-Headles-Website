import { SessionProvider as NextAuthProvider } from 'next-auth/react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { CookiesProvider } from 'react-cookie'
import CookieConsent from 'react-cookie-consent'
import '@/styles/main.scss'
import '@/styles/survey-core.scss'
import '@/styles/survey-creator-core.scss'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <CookiesProvider>
      <NextAuthProvider session={session}>
        <Component {...pageProps} />
      </NextAuthProvider>

      <CookieConsent
        location='bottom'
        buttonText='I understand'
        cookieName='cookie-consent'
        style={{ background: '#582BCF' }}
        buttonStyle={{ backgroundColor: '#321898', color: '#FFFFFF' }}
        expires={365}
      >
        <div className='container text-center'>
          <p className='text-xl font-semibold'>This website uses cookies</p>
          <p className='mb-2'>
            We use cookies to personalize content and ads, to provide social
            media features and to analyse our traffic. We also share information
            about your use of our site with our social media, advertising and
            analytics partners who may combine it with other information that
            you’ve provided to them or that they’ve collected from your use of
            their services.
          </p>
          <p>
            You can see our full privacy policy{' '}
            <Link href='/privacy-policy'>
              <a className='underline'>here</a>
            </Link>
          </p>
        </div>
      </CookieConsent>
    </CookiesProvider>
  )
}

App.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object.isRequired,
}
