import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { useSession } from 'next-auth/react'
import { Popover } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import isLinkActive from '@/functions/isLinkActive'
import Transition from '@/components/atoms/Transition'
import Image from '@/components/atoms/Image'
import styles from './PrimaryMenu.module.scss'
import Icon from '@/components/atoms/Icon'
import Button from '@/components/atoms/Button'
import isDHA from '@/functions/isDHA'

/**
 * Render the Navigation component.
 *
 * @author                           Murrell Johnson
 * @param  {object}  props           Navigation props.
 * @param  {Array}   props.menu      Array of menu items.
 * @return {Element}                 The Navigation component.
 */
export default function PrimaryMenu() {
  const { data: session, status } = useSession()

  const router = useRouter()
  const asPath = router ? router.asPath : '/'

  // const mostWired = [
  //   {
  //     label: 'Providers',
  //     path: '/contact',
  //   },
  //   {
  //     label: 'Providers +',
  //     path: '/portal',
  //     icon: 'path',
  //   },
  //   {
  //     label: 'Market Research',
  //     path: '/market-research',
  //   },
  //   {
  //     label: 'Market Research +',
  //     path: '/portal',
  //     icon: 'path',
  //   },
  // ]

  return (
    <Popover>
      <div className={styles.wrap}>
        <div className={styles.desktop}>
          <div className={styles.logo}>
            {isDHA(asPath) ? (
              <Image
                src='dha_logo_regular_mix'
                href='/analytics'
                width={155}
                height={59}
              />
            ) : (
              <Image
                src='dhi_logo_regular_mix'
                href='/'
                width={120}
                height={59}
              />
            )}
          </div>

          <div className={styles.hamburgerWrap}>
            <Popover.Button className={styles.hamburger}>
              <span>Open menu</span>
              <MenuIcon aria-hidden='true' />
            </Popover.Button>
          </div>

          <Popover.Group as='nav' className={styles.menus}>
            {!isDHA(asPath) && (
              <Link href='/news'>
                <a
                  className={cn(
                    isLinkActive(asPath, '/news') && styles.active,
                    styles.menu
                  )}
                >
                  News
                </a>
              </Link>
            )}

            {!isDHA(asPath) && (
              <Link href='/insight'>
                <a
                  className={cn(
                    isLinkActive(asPath, '/insight') && styles.active,
                    styles.menu
                  )}
                >
                  Resources
                </a>
              </Link>
            )}
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

            {!isDHA(asPath) && (
              <Link href='/advertise'>
                <a
                  className={cn(
                    isLinkActive(asPath, '/advertise') && styles.active,
                    styles.menu
                  )}
                >
                  Advertise
                </a>
              </Link>
            )}

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

            {isDHA(asPath) ? (
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
            ) : (
              <Link href='/analytics'>
                <a
                  className={cn(
                    isLinkActive(asPath, '/analytics') && styles.active,
                    styles.menu
                  )}
                >
                  Analytics
                </a>
              </Link>
              // <Popover className='relative'>
              //   {() => (
              //     <>
              //       <Popover.Button className={styles.menu}>
              //         <span>Analytics</span>
              //       </Popover.Button>

              //       <Transition>
              //         <Popover.Panel className={styles.megaWrap}>
              //           <div className={styles.mega}>
              //             <div className={styles.megaImage}>
              //               <Image
              //                 src='mostwiredThumb'
              //                 href='/analytics'
              //                 width={207}
              //                 height={224}
              //               />
              //             </div>

              //             <div className={styles.megaInner}>
              //               <Link href='/analytics'>
              //                 <a className={styles.megaTitle}>
              //                   Digital Health Analytics
              //                   <Icon
              //                     icon='path'
              //                     size={20}
              //                     className={styles.icon}
              //                   />
              //                 </a>
              //               </Link>

              //               {mostWired.map((item, index) => (
              //                 <Link href={item.path} key={index}>
              //                   <a className={styles.link}>
              //                     {item.label}
              //                     <Icon
              //                       icon='path'
              //                       size={18}
              //                       className={styles.icon}
              //                     />
              //                   </a>
              //                 </Link>
              //               ))}
              //             </div>
              //           </div>
              //         </Popover.Panel>
              //       </Transition>
              //     </>
              //   )}
              // </Popover>
            )}

            <a
              href='https://mydigitalhealthcommunity.org/'
              target='_blank'
              rel='noreferrer'
              className={cn(
                isLinkActive(asPath, '/communities') && styles.active,
                styles.menu
              )}
            >
              {isDHA(asPath) ? (
                <span>Digital Health Community</span>
              ) : (
                <span>Communities</span>
              )}
            </a>
          </Popover.Group>

          {isDHA(asPath) ? (
            <div className={styles.loginBtn}>
              {session && status === 'authenticated' ? (
                <Button
                  text='Portal'
                  type='primary'
                  icon='portal'
                  href='/portal/projects/'
                  className='bg-purple text-white'
                />
              ) : (
                <Button
                  text='Login'
                  type='primary'
                  icon='man'
                  href='/portal/'
                  className='bg-purple text-white'
                />
              )}
            </div>
          ) : (
            <form action='/search' className={styles.search}>
              <input
                type='search'
                name='q'
                className={styles.searchInput}
                placeholder='Search by Keyword'
              />
              <Icon icon='search' size={20} className={styles.searchIcon} />
            </form>
          )}
        </div>
      </div>

      <Transition>
        <Popover.Panel focus className={styles.mobile}>
          <div className={styles.mobileInner}>
            <div className={styles.mobileHead}>
              {isDHA(asPath) ? (
                <Image
                  src='dha_logo_regular_mix'
                  href='/analytics'
                  width={155}
                  height={59}
                />
              ) : (
                <Image
                  src='dhi_logo_regular_mix'
                  href='/'
                  width={120}
                  height={59}
                />
              )}
              <div className={styles.hamburgerWrap}>
                <Popover.Button className={styles.hamburger}>
                  <span>Close menu</span>
                  <XIcon aria-hidden='true' />
                </Popover.Button>
              </div>
            </div>

            <div className={styles.mobileBody}>
              <nav>
                {!isDHA(asPath) && (
                  <Link href='/news'>
                    <a
                      className={cn(
                        isLinkActive(asPath, '/news') && styles.active,
                        styles.menu
                      )}
                    >
                      News
                    </a>
                  </Link>
                )}

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

                {!isDHA(asPath) && (
                  <Link href='/advertise'>
                    <a
                      className={cn(
                        isLinkActive(asPath, '/advertise') && styles.active,
                        styles.menu
                      )}
                    >
                      Advertise
                    </a>
                  </Link>
                )}

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

                {isDHA(asPath) ? (
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
                ) : (
                  <>
                    <Link href='/analytics'>
                      <a
                        className={cn(
                          isLinkActive(asPath, '/analytics') && styles.active,
                          styles.menu
                        )}
                      >
                        Analytics
                        {/* <Icon icon='path' size={20} className={styles.icon} /> */}
                      </a>
                    </Link>

                    {/* {mostWired.map((item, index) => (
                      <Link href={item.path} key={index}>
                        <a target='_self' className={styles.subMenu}>
                          {item.label}
                          <Icon icon='path' size={20} className={styles.icon} />
                        </a>
                      </Link>
                    ))} */}
                  </>
                )}

                <a
                  href='https://mydigitalhealthcommunity.org/'
                  target='_blank'
                  rel='noreferrer'
                  className={cn(
                    isLinkActive(asPath, '/communities') && styles.active,
                    styles.menu
                  )}
                >
                  {isDHA(asPath) ? (
                    <span>Digital Health Community</span>
                  ) : (
                    <span>Communities</span>
                  )}
                </a>

                {isDHA(asPath) ? (
                  <div className={styles.mobileLoginBtn}>
                    {session ? (
                      <Button
                        text='Portal'
                        type='primary'
                        icon='portal'
                        href='/portal/projects/'
                        className='bg-purple text-white'
                      />
                    ) : (
                      <Button
                        text='Login'
                        type='primary'
                        icon='man'
                        href='/portal/'
                        className='bg-purple text-white'
                      />
                    )}
                  </div>
                ) : (
                  <form action='/search' className={styles.searchMobile}>
                    <input
                      type='search'
                      name='q'
                      className={styles.searchInput}
                      placeholder='Search by Keyword'
                    />
                    <Icon
                      icon='search'
                      size={20}
                      className={styles.searchIcon}
                    />
                  </form>
                )}
              </nav>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

PrimaryMenu.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.object),
}
