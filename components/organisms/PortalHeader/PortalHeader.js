import Link from 'next/link'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { Popover } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import isLinkActive from '@/functions/isLinkActive'
import Transition from '@/components/atoms/Transition'
import Image from '@/components/atoms/Image'
import styles from './PortalHeader.module.scss'
import { useSession } from 'next-auth/react'
import Avatar from 'react-avatar'

/**
 * Render the Navigation component.
 *
 * @author                           Murrell Johnson
 * @param  {object}  props           Navigation props.
 * @param  {Array}   props.menu      Array of menu items.
 * @return {Element}                 The Navigation component.
 */
export default function PortalHeader() {
  const router = useRouter()
  const asPath = router ? router.asPath : '/'

  const { data: session } = useSession()

  return (
    <Popover>
      <div className={styles.wrap}>
        <div className={styles.desktop}>
          <div className={styles.logo}>
            <Image
              src='dha_logo_regular_mix'
              href='/analytics'
              width={155}
              height={59}
            />
          </div>

          <div className={styles.hamburgerWrap}>
            <Popover.Button className={styles.hamburger}>
              <span>Open menu</span>
              <MenuIcon aria-hidden='true' />
            </Popover.Button>
          </div>

          <Popover.Group as='nav' className={styles.menus}>
            <Link href='/about'>
              <a
                className={cn(
                  isLinkActive(asPath, '/about') && styles.active,
                  styles.menu
                )}
              >
                About
              </a>
            </Link>

            {/* <Link href='/advertise'>
              <a
                className={cn(
                  isLinkActive(asPath, '/advertise') && styles.active,
                  styles.menu
                )}
              >
                Advertise
              </a>
            </Link> */}

            <Link href='/contact'>
              <a
                className={cn(
                  isLinkActive(asPath, '/contact') && styles.active,
                  styles.menu
                )}
              >
                Contact
              </a>
            </Link>

            <Link href='/'>
              <a
                className={cn(
                  isLinkActive(asPath, '/') && styles.active,
                  styles.menu
                )}
              >
                Digital Health Insights
              </a>
            </Link>

            <a
              href='https://mydigitalhealthcommunity.org/'
              target='_blank'
              rel='noreferrer'
              className={styles.menu}
            >
              <span>Digital Health Community</span>
            </a>
          </Popover.Group>

          {/* <form action='/search' className={styles.search}>
            <input
              type='search'
              name='q'
              className={styles.searchInput}
              placeholder='Search by Keyword'
            />
            <Icon icon='search' size={20} className={styles.searchIcon} />
          </form> */}

          {session && (
            <Link href='/portal/settings/'>
              <a className={styles.menus}>
                <Avatar
                  email={session.email}
                  name={`${session.firstName} ${session.lastName}`}
                  size={40}
                  round={true}
                  className={styles.avatar}
                />
              </a>
            </Link>
          )}
        </div>
      </div>

      <Transition>
        <Popover.Panel focus className={styles.mobile}>
          <div className={styles.mobileInner}>
            <div className={styles.mobileHead}>
              <Image
                src='dha_logo_regular_mix'
                href='/analytics'
                width={155}
                height={59}
              />
              <div className={styles.hamburgerWrap}>
                <Popover.Button className={styles.hamburger}>
                  <span>Close menu</span>
                  <XIcon aria-hidden='true' />
                </Popover.Button>
              </div>
            </div>

            <div className={styles.mobileBody}>
              <nav>
                <Link href='/about'>
                  <a
                    className={cn(
                      isLinkActive(asPath, '/about') && styles.active,
                      styles.menu
                    )}
                  >
                    About
                  </a>
                </Link>

                {/* <Link href='/advertise'>
                  <a
                    className={cn(
                      isLinkActive(asPath, '/advertise') && styles.active,
                      styles.menu
                    )}
                  >
                    Advertise
                  </a>
                </Link> */}

                <Link href='/contact'>
                  <a
                    className={cn(
                      isLinkActive(asPath, '/contact') && styles.active,
                      styles.menu
                    )}
                  >
                    Contact
                  </a>
                </Link>

                <Link href='/'>
                  <a
                    className={cn(
                      isLinkActive(asPath, '/') && styles.active,
                      styles.menu
                    )}
                  >
                    Digital Health Insights
                  </a>
                </Link>

                <a
                  href='https://mydigitalhealthcommunity.org/'
                  target='_blank'
                  rel='noreferrer'
                  className={styles.menu}
                >
                  <span>Digital Health Community</span>
                </a>

                {/* <form action='/search' className={styles.searchMobile}>
                  <input
                    type='search'
                    name='q'
                    className={styles.searchInput}
                    placeholder='Search by Keyword'
                  />
                  <Icon icon='search' size={20} className={styles.searchIcon} />
                </form> */}

                {session && (
                  <Link href='/portal/settings/'>
                    <a>
                      <Avatar
                        email={session.email}
                        name={`${session.firstName} ${session.lastName}`}
                        size={40}
                        round={true}
                        className={styles.avatar}
                      />
                    </a>
                  </Link>
                )}
              </nav>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
