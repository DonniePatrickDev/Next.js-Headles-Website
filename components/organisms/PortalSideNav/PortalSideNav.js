import React, { useState } from 'react'
import cn from 'classnames'
import Icon from '@/components/atoms/Icon'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import styles from './PortalSideNav.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import isLinkActive from '@/functions/isLinkActive'
import { useSession } from 'next-auth/react'

export default function index() {
  const { data: session } = useSession()
  const level = session?.membership?.level

  const router = useRouter()
  const asPath = router ? router.asPath : '/'

  const [expand, setExpand] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ])

  const [show, setShow] = useState(false)

  const setExpandValue = (props) => {
    let newArr = [...expand]
    newArr[props] = !newArr[props]
    setExpand(newArr)
  }

  const menus =
    level !== 'market-research'
      ? [
          {
            text: 'Dashboard',
            icon: 'star',
            subMenus: [
              {
                text: 'Dashboard',
                link: '/portal/projects/',
              },
              {
                text: 'Project Library',
                link: '/portal/projects/library/',
              },
              {
                text: 'Start a New Project',
                link: '/portal/projects/new/',
              },
            ],
          },
          {
            text: 'Digital Health Most Wired',
            icon: 'star',
            subMenus: [
              {
                text: 'National Trends Report',
                link: '/portal/dhmw/national-trends-report/',
              },
              {
                text: 'My Results',
                link: '/portal/dhmw/my-results/',
              },
              {
                text: 'All DHMW Reports',
                link: '/portal/dhmw/',
              },
            ],
          },
          {
            text: 'Analytics',
            icon: 'analytics',
            subMenus: [
              {
                text: 'My Analysis',
                link: '/portal/analytics/',
              },
              {
                text: 'Run a Query',
                link: '/portal/analytics/new/',
              },
            ],
          },
          {
            text: 'Surveys',
            icon: 'analytics',
            subMenus: [
              {
                text: 'Survey Library',
                link: '/portal/surveys/',
              },
              {
                text: 'My Survey',
                link: '/portal/surveys/my-survey',
              },
              {
                text: 'Create A Survey',
                link: '/portal/surveys/new',
              },
            ],
          },
          {
            text: 'Reports',
            icon: 'analytics',
            subMenus: [
              {
                text: 'My Reports',
                link: '/portal/reports/',
              },
              {
                text: 'Create A Report',
                link: '/portal/reports/new/',
              },
            ],
          },
          {
            text: 'Market Insights',
            icon: 'analytics',
            subMenus: [
              {
                text: 'Administrative / Supply Chain',
                link: '/market-insights/topics/administrative-supply-chain/',
              },
              {
                text: 'Clinical Quality & Safety',
                link: '/market-insights/topics/clinical-quality-and-safety/',
              },
              {
                text: 'Data Management & Analytics',
                link: '/market-insights/topics/data-management-analytics/',
              },
              {
                text: 'Digital Health Trends & Priorities',
                link: '/market-insights/topics/digital-health-trends-priorities/',
              },
              {
                text: 'Interoperability / Population Health',
                link: '/market-insights/topics/interoperability-population-health/',
              },
              {
                text: 'Innovation & Emerging Technology',
                link: '/market-insights/topics/innovation-emerging-technolog/',
              },
              {
                text: 'Infrastructure',
                link: '/market-insights/topics/infrastructure/',
              },
              {
                text: 'Patient Engagement',
                link: '/market-insights/topics/patient-engagement/',
              },
              {
                text: 'Security',
                link: '/market-insights/topics/security/',
              },
            ],
          },
        ]
      : [
          {
            text: 'Dashboard',
            icon: 'star',
            subMenus: [
              {
                text: 'Dashboard',
                link: '/portal/projects/',
              },
              {
                text: 'Project Library',
                link: '/portal/projects/library/',
              },
              {
                text: 'Start a New Project',
                link: '/portal/projects/new/',
              },
            ],
          },
          {
            text: 'Digital Health Most Wired',
            icon: 'star',
            subMenus: [
              {
                text: 'National Trends Report',
                link: '/portal/dhmw/national-trends-report/',
              },
              {
                text: 'My Results',
                link: '/portal/dhmw/my-results/',
              },
              {
                text: 'All DHMW Reports',
                link: '/portal/dhmw/',
              },
            ],
          },
          {
            text: 'Analytics',
            icon: 'analytics',
            subMenus: [
              {
                text: 'My Analysis',
                link: '/portal/analytics/',
              },
              {
                text: 'Run a Query UPGRADE!',
                link: '/portal/membership/market-research-upgrade',
              },
            ],
          },
          {
            text: 'Surveys',
            icon: 'analytics',
            subMenus: [
              // {
              //   text: 'Survey Library',
              //   link: '/portal/surveys/',
              // },
              // {
              //   text: 'My Survey',
              //   link: '/portal/surveys/my-survey',
              // },
              {
                text: 'Create A Survey UPGRADE!',
                link: '/portal/membership/market-research-upgrade',
              },
            ],
          },
          {
            text: 'Reports',
            icon: 'analytics',
            subMenus: [
              {
                text: 'My Reports',
                link: '/portal/reports/',
              },
              {
                text: 'Create A Report UPGRADE!',
                link: '/portal/membership/market-research-upgrade',
              },
            ],
          },
          {
            text: 'Market Insights',
            icon: 'analytics',
            subMenus: [
              {
                text: 'Administrative / Supply Chain',
                link: '/market-insights/topics/administrative-supply-chain/',
              },
              {
                text: 'Clinical Quality & Safety',
                link: '/market-insights/topics/clinical-quality-and-safety/',
              },
              {
                text: 'Data Management & Analytics',
                link: '/market-insights/topics/data-management-analytics/',
              },
              {
                text: 'Digital Health Trends & Priorities',
                link: '/market-insights/topics/digital-health-trends-priorities/',
              },
              {
                text: 'Interoperability / Population Health',
                link: '/market-insights/topics/interoperability-population-health/',
              },
              {
                text: 'Innovation & Emerging Technology',
                link: '/market-insights/topics/innovation-emerging-technolog/',
              },
              {
                text: 'Infrastructure',
                link: '/market-insights/topics/infrastructure/',
              },
              {
                text: 'Patient Engagement',
                link: '/market-insights/topics/patient-engagement/',
              },
              {
                text: 'Security',
                link: '/market-insights/topics/security/',
              },
            ],
          },
        ]

  return (
    <div className={styles.root}>
      <div aria-label='toggler' className={styles.toggle}>
        <button
          aria-label='open'
          onClick={() => setShow(true)}
          className={show ? styles.hide : undefined}
        >
          <MenuIcon width={24} height={24} />
        </button>

        <button
          aria-label='close'
          onClick={() => setShow(false)}
          className={!show && styles.hide}
        >
          <XIcon width={24} height={24} />
        </button>
      </div>

      <div className={cn(show && styles.collapse, styles.wrap)}>
        {menus.map((menu, menuIndex) => (
          <div className={styles.menuWrap} key={menuIndex}>
            <button
              onClick={() => setExpandValue(menuIndex)}
              className={styles.menu}
            >
              <span className={styles.menuText}>
                <Icon icon={menu.icon} size={24} className={styles.menuIcon} />
                {menu.text}
              </span>

              <div
                className={cn(
                  !expand[menuIndex] && styles.rotate,
                  styles.iconExpand
                )}
              >
                <Icon icon='down' size={10} />
              </div>
            </button>

            <div
              className={cn(
                !expand[menuIndex] && styles.hide,
                styles.subMenuWrap
              )}
            >
              {menu.subMenus.map((subMenu, subMenuIndex) => (
                <Link href={subMenu.link} key={subMenuIndex}>
                  <a
                    className={cn(
                      isLinkActive(asPath, subMenu.link) && styles.menuActive,
                      styles.subMenu
                    )}
                  >
                    {subMenu.text}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
