import PrimaryMenu from '@/components/molecules/PrimaryMenu'
import SecondaryMenu from '@/components/molecules/SecondaryMenu'
import isDHA from '@/functions/isDHA'
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter()
  const asPath = router ? router.asPath : '/'

  return (
    <>
      <PrimaryMenu />

      {!isDHA(asPath) && <SecondaryMenu />}
    </>
  )
}
