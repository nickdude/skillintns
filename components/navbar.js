import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/navbar.module.css';
import FeedbackForm from './feedbackForm';

export default function Navbar() {
  const [isFeedbackOpen, setFeedbackOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const openFeedback = () => setFeedbackOpen(true);
  const closeFeedback = () => setFeedbackOpen(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Image width={205} height={100} src="/skillintns.svg" alt="SkillIntns Logo" />
        </div>
        <div className={styles.buttonsGrid}>
          {/* Feedback button triggers the popup */}
          <button className={styles.feedbackButton} onClick={openFeedback}>
            Give Feedback
          </button>
          <div className={styles.hamburgLogoutContainer}>
            <div className={styles.hamburg} onClick={toggleSidebar}>
              <Image
                src="/hamburg.svg"
                alt="Hamburg Icon"
                width="30"
                height="30"
                className={styles.hamburgIcon}
              />
            </div>
            <div className={styles.userSection}>
              <Link href="/" className={styles.logoutLink}>
                {/* <Image
                  src="/profile.png"
                  alt="Logout Icon"
                  width="30"
                  height="30"
                  className={styles.userAvatar}
                /> */}
                Log Out
                <Image
                  src="/exit.svg"
                  alt="Exit Icon"
                  width="20"
                  height="20"
                  className={styles.exit}
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className={styles.sidebar}>
          <button className={styles.closeButton} onClick={toggleSidebar}>
            ✕
          </button>
          <ul className={styles.sidebarMenu}>
            <li>
            <div className={styles.userSectionMob}>
              <Link href="/" className={styles.logoutLinkMob}>
                {/* <Image
                  src="/profile.png"
                  alt="Logout Icon"
                  width="30"
                  height="30"
                  className={styles.userAvatar}
                /> */}
                Log Out
                <Image
                  src="/exit.svg"
                  alt="Exit Icon"
                  width="20"
                  height="20"
                  className={styles.exitMob}
                />
              </Link>
            </div>
            </li>
          </ul>
        </div>
      )}
      {/* FeedbackForm component, rendered conditionally */}
      <FeedbackForm isOpen={isFeedbackOpen} onClose={closeFeedback} />
    </>
  );
}
