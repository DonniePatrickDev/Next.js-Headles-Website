import FooterSocial from '@/components/molecules/FooterSocial'
import PortalFooterMenu from '@/components/molecules/PortalFooterMenu'

/**
 * Render the Footer component.
 *
 * @author                           WebDevStudios
 * @param  {object}  props           The component attributes as props.
 * @return {Element}                 The Footer component.
 */
export default function PortalFooter() {
  return (
    <footer>
      <PortalFooterMenu />

      <FooterSocial />
    </footer>
  )
}
