import HubspotForm from 'react-hubspot-form'
import Script from 'next/script'
import PropTypes from 'prop-types'
import { useCookies } from 'react-cookie'
import { arrayToObject } from '@/functions/wordpress/util'
import { registerUser } from '@/functions/wordpress/fetchData'

export default function Form({ formId, action, className }) {
  // eslint-disable-next-line no-unused-vars
  const [cookie, setCookie] = useCookies(['subscribed'])

  async function handleregisterUser(form) {
    const formOjb = arrayToObject(form)
    await registerUser(formOjb)
  }

  async function handleSubscribe() {
    setCookie('subscribed', 'true', {
      path: '/',
      sameSite: true,
      maxAge: 86400 * 365,
    })
  }

  return (
    <div className={className}>
      {formId && (
        <>
          <Script src='https://code.jquery.com/jquery-3.6.0.min.js' />
          <HubspotForm
            portalId={process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID}
            formId={formId}
            onFormSubmitted={(form) =>
              action === 'register'
                ? handleregisterUser(form)
                : action === 'subscribe'
                ? handleSubscribe()
                : null
            }
            loading={<div className='text-center text-white'>Loading...</div>}
          />
        </>
      )}
    </div>
  )
}

Form.propTypes = {
  formId: PropTypes.string,
  action: PropTypes.oneOf(['subscribe', 'register']),
  className: PropTypes.string,
}

Form.defaultProps = {
  formId: null,
  action: 'subscribe',
}
