import Background from '@/components/atoms/Background'
import Button from '@/components/atoms/Button'
import Divider from '@/components/atoms/Divider/Divider'
import Icon from '@/components/atoms/Icon'
import Image from '@/components/atoms/Image'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'next-share'

export default function InsightSocial({ slug, title, type }) {
  return (
    <>
      <Divider color='dark' />

      <h3 className='text-xl font-bold uppercase mb-3 mt-6'>
        Show Your Support
      </h3>

      <div className='flex flex-wrap mb-8'>
        <FacebookShareButton
          url={`https://dhinsights.org/${type}/${slug}`}
          quote={title}
          style={{
            backgroundColor: '#4267B2',
            borderRadius: '999px',
            padding: '8px 32px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            marginRight: '12px',
            marginBottom: '8px',
          }}
        >
          <Icon icon='facebook_white' />
          <span className='ml-2'>Share</span>
        </FacebookShareButton>

        <TwitterShareButton
          url={`https://dhinsights.org/${type}/${slug}`}
          title={title}
          style={{
            backgroundColor: '#1DA1F2',
            borderRadius: '999px',
            padding: '8px 32px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            marginRight: '12px',
            marginBottom: '8px',
          }}
        >
          <Icon icon='twitter_white' />
          <span className='ml-2'>Tweet</span>
        </TwitterShareButton>
        <LinkedinShareButton
          url={`https://dhinsights.org/${type}/${slug}`}
          title={title}
          style={{
            backgroundColor: '#1DA1F2',
            borderRadius: '999px',
            padding: '8px 32px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            marginRight: '12px',
            marginBottom: '8px',
          }}
        >
          <Icon icon='linkedin_white' />
          <span className='ml-2'>Share</span>
        </LinkedinShareButton>
      </div>

      <div className='relative'>
        <Background image='social_share_bg' />

        <div className='px-8 md:px-20 py-12 grid md:grid-cols-2 gap-4'>
          <div>
            <Image
              src='dhc_logo_bold_white'
              width={168}
              height={86}
              className='mb-4'
            />

            <h4 className='text-white text-2xl md:text-3xl'>
              Join the Community
            </h4>
          </div>

          <div>
            <Image
              src='social_people'
              width={416}
              height={96}
              className='mb-4'
            />

            <Button
              type='tertiary'
              size='lg'
              text='Request Access & Join DHI'
              href='/dha-access-is-coming-soon'
            />
          </div>
        </div>
      </div>
    </>
  )
}
