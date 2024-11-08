import Head from 'next/head'
import PropTypes from 'prop-types'
import Footer from '@/components/organisms/Footer'
import Header from '@/components/organisms/Header'
import { useRouter } from 'next/router'
import PortalFooter from '../organisms/PortalFooter'
import isDHA from '@/functions/isDHA'

export default function Layout({ children, newsletter, seo }) {
  const router = useRouter()
  const asPath = router ? router.asPath : '/'

  return (
    <>
      <Head>{seo}</Head>
      <Header />
      <main id='page-content'>{children}</main>
      {isDHA(asPath) ? <PortalFooter /> : <Footer newsletter={newsletter} />}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.any.isRequired,
  newsletter: PropTypes.bool,
}

Layout.defaultProps = {
  newsletter: true,
}
