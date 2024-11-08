import Breadcrumbs from '@/components/atoms/Breadcrumbs'
import Layout from '@/components/common/Layout'
import SearchResults from '@/components/organisms/SearchResults'

export default function PortalPage() {
  const breadcrumbs = [
    { icon: 'home_white', text: 'Back to Home', url: '/' },
    {
      text: 'Search',
      url: `/search`,
    },
  ]

  return (
    <Layout>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <SearchResults />
    </Layout>
  )
}
