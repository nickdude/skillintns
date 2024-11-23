import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/navbar.module.css';
import FeedbackForm from './feedbackForm';

export default function Navbar() {
  const [isFeedbackOpen, setFeedbackOpen] = useState(false);

  const openFeedback = () => setFeedbackOpen(true);
  const closeFeedback = () => setFeedbackOpen(false);

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
            <div className={styles.hamburg}>
              <Image
                src="/hamburg.svg"
                alt="Hamburg Icon"
                width="30"
                height="30"
                className={styles.hamburgIcon}
              />
            </div>
            <div className={styles.userSection}>
              <Link href="/logout" className={styles.logoutLink}>
                <Image
                  src="/profile.png"
                  alt="Logout Icon"
                  width="30"
                  height="30"
                  className={styles.userAvatar}
                />
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
      {/* FeedbackForm component, rendered conditionally */}
      <FeedbackForm isOpen={isFeedbackOpen} onClose={closeFeedback} />
    </>
  );
}
