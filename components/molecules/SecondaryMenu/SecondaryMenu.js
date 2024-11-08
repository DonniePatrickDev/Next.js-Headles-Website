import { getSecondaryMenus } from '@/functions/wordpress/fetchData'
import styles from './SecondaryMenu.module.scss'

export default function SecondaryMenu() {
  const { menus } = getSecondaryMenus()

  return (
    <div className={styles.background}>
      <div className={styles.wrap}>
        <div className={styles.inner}>
          <span className={styles.title}>Explore our Topics:</span>

          {menus &&
            menus.items.map((menu, index) => (
              <a href={menu.url} key={index} className={styles.link}>
                {menu.post_title}
              </a>
            ))}
        </div>
      </div>
    </div>
  )
}
