import Image from '@/components/atoms/Image'
import { getSecondaryMenus } from '@/functions/wordpress/fetchData'
import Link from 'next/link'
import styles from './FooterMenu.module.scss'

export default function FooterMenu() {
  const { menus } = getSecondaryMenus()

  return (
    <div className={styles.root}>
      <div className={styles.wrap}>
        <div className={styles.inner}>
          <div className={styles.about}>
            <Image
              src='dhi_logo_bold_dark'
              alt='Footer Logo'
              width={155}
              height={94}
              className='mb-3'
            />

            <h4 className={styles.heading}>About DHI</h4>

            <p className={styles.text}>
              Digital Health Insights delivers actionable information on the
              most pressing issues facing healthcare professionals today.
            </p>

            {/* <p className={`${styles.text} font-bold`}>
              The X in our brand represents the exponential effect of how
              communities, analysis, and insights can drive organizations to new
              levels of performance, understanding, and outcomes.
            </p> */}
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

                  <li>
                    <Link href={'/privacy-policy'}>
                      <a className={styles.link}>Privacy Policy</a>
                    </Link>
                  </li>

                  <li>
                    <Link href={'/sitemap.xml'}>
                      <a className={styles.link}>Sitemap</a>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className='w-full md:w-4/12 px-2 md:px-4 mb-4 md:mb-0'>
                <h4 className={styles.heading}>REACH OUR AUDIENCE</h4>
                <ul>
                  <li>
                    <Link href={'/advertise'}>
                      <a className={styles.link}>Advertising</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={'/contact'}>
                      <a className={styles.link}>Submit Content</a>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className='w-full md:w-4/12 px-2 md:px-4 mb-4 md:mb-0'>
                <h4 className={styles.heading}>Featured Topics</h4>

                <ul>
                  {menus &&
                    menus.items.map((menu, index) => (
                      <li key={index}>
                        <a href={menu.url} className={styles.link}>
                          {menu.post_title}
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
