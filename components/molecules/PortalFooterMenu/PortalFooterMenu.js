import Image from '@/components/atoms/Image'
import Link from 'next/link'
import styles from './PortalFooterMenu.module.scss'

export default function PortalFooterMenu() {
  // const { menus } = getSecondaryMenus()

  const menus = [
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
  ]

  return (
    <div className={styles.root}>
      <div className={styles.wrap}>
        <div className={styles.inner}>
          <div className={styles.about}>
            <Image
              src='dha_logo_bold_dark'
              alt='Footer Logo'
              href='/analytics'
              width={179.2}
              height={86.8}
              className='mb-6'
            />

            <h4 className={styles.heading}>About DHA</h4>

            <p className={styles.text}>
              Digital Health Analytics (DHA) is the the gateway for provider
              organizations and companies to better understand how digital
              technology supports leaders in transforming health and care and
              delivering data insights that help them make the greatest business
              impact possible.
            </p>

            <p className={`${styles.text} font-bold`}>
              The X in our brand represents the exponential effect of how
              communities, analysis, and insights can drive organizations to new
              levels of performance, understanding, and outcomes.
            </p>
          </div>

          <div className={styles.menusWrap}>
            <div className={styles.menus}>
              <div className={styles.menu}>
                <h4 className={styles.heading}>Explore</h4>

                <ul>
                  <li>
                    <Link href={'/about'}>
                      <a className={styles.link}>About</a>
                    </Link>
                  </li>

                  <li>
                    <Link href={'/contact'}>
                      <a className={styles.link}>Contact Us</a>
                    </Link>
                  </li>

                  {/* <li>
                    <Link href={'/privacy-policy'}>
                      <a className={styles.link}>Privacy Policy</a>
                    </Link>
                  </li> */}
                </ul>
              </div>

              <div className={styles.menu}>
                <h4 className={styles.heading}>REACH OUR AUDIENCE</h4>
                <ul>
                  <li>
                    <Link href={'/portal/sponsorship'}>
                      <a className={styles.link}>Sponsorship</a>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className={styles.menu}>
                <h4 className={styles.heading}>
                  Digital Health Most Wired Segment
                </h4>

                <ul>
                  {menus.map((menu, index) => (
                    <li key={index}>
                      <a href={menu.link} className={styles.link}>
                        {menu.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
