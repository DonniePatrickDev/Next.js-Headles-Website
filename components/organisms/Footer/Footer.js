import PropTypes from 'prop-types'
import FooterMenu from '@/components/molecules/FooterMenu'
import FooterSocial from '@/components/molecules/FooterSocial'
import FooterSubscribe from '@/components/molecules/FooterSubscribe'

/**
 * Render the Footer component.
 *
 * @author                           WebDevStudios
 * @param  {object}  props           The component attributes as props.
 * @param  {object}  props.social    Yoast SEO social media data.
 * @param  {object}  props.menu      Arrary of menu items.
 * @param  {string}  props.siteTitle Yoast SEO site title.
 * @return {Element}                 The Footer component.
 */
export default function Footer({ newsletter }) {
  return (
    <footer>
      {newsletter && <FooterSubscribe />}

      <FooterMenu />

      <FooterSocial />
    </footer>
  )
}

Footer.propTypes = {
  newsletter: PropTypes.bool,
}
