import dateFormat from 'dateformat'
import Link from 'next/link'

export default function PortalMembershipPanel({
  membership,
  level,
  organization,
}) {
  return (
    <div className='relative shadow rounded p-6 mb-12 bg-white'>
      <div className='pt-8 lg:pt-0'>
        <div className='mb-4'>
          <span className='text-sm text-white bg-gray py-1 px-5 rounded-full'>
            {level?.includes('market-research')
              ? 'Market Research'
              : '2021 Digital Health Most Wired Survey Participant'}
          </span>
        </div>

        <h1 className='text-purple text-3xl lg:text-4xl font-bold mb-4'>
          {level === 'market-research'
            ? 'Upgrade For Full Access'
            : organization || membership.product}
        </h1>

        {level !== 'market-research' && (
          <>
            <span className='font-semibold mr-6 capitalize'>
              DHA {level?.replace('-', ' ').replace('-', ' ')}
            </span>

            <span className='block lg:inline-block font-semibold mr-6'>
              Subscriber Since:{' '}
              {dateFormat(
                membership?.memberSince || '4/11/2022',
                'mmmm dS, yyyy'
              )}
            </span>

            <span className='font-semibold mr-6'>
              Expires At:{' '}
              {dateFormat(
                membership?.expireAt || '10/31/2022',
                'mmmm dS, yyyy'
              )}
            </span>
          </>
        )}
      </div>

      <div className='absolute right-5 top-3'>
        {!level?.includes('plus') && (
          <Link
            href={
              level === 'provider'
                ? '/portal/membership/provider-upgrade'
                : '/portal/membership/market-research-upgrade'
            }
          >
            <a className='text-purple mr-4'>Upgrade</a>
          </Link>
        )}

        <Link href='/portal/settings/'>
          <a className='text-purple'>Manage Account</a>
        </Link>
      </div>
    </div>
  )
}
