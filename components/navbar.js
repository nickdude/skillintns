import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/navbar.module.css'


export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image width={205} height={100} src="/skillintns.svg" alt="SkillIntns Logo" />
      </div>
      <div className={styles.buttonsGrid}>
        <button className={styles.feedbackButton}>Give Feedback</button>
            
        <div className={styles.hamburgLogoutContainer}>
          <div className={styles.hamburg}>
            <Image src="/hamburg.svg" alt='Hamburg Icon' width="30" height="30" className={styles.hamburgIcon} />
          </div>   
          <div className={styles.userSection}>
            <Link href="/logout" className={styles.logoutLink}>
              <Image src="/profile.png" alt="Logout Icon" width="30" height="30" className={styles.userAvatar} />
              Log Out 
              <Image src="/exit.svg" alt="Exit Icon" width="20" height="20" className={styles.exit}/>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
