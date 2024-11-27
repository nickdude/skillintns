import styles from '../styles/cards.module.css';
import Button from '../components/button';

export default function Card({
  image,
  skillCount,
  isFree,
  title,
  publisher,
  className,
}) {
  return (
    <div className={`${styles.card} ${className || ''}`}>
      <div className={styles.cardImageWrapper}>
        {/* Display image */}
        <img src={image} alt={title} className={styles.cardImage} />
        <span className={styles.skillCount}>{skillCount} Skills</span>
      </div>

      <div className={styles.cardContent}>
        {/* Display title */}
        <h2 className={styles.cardTitle}>{title}</h2>

        {/* Display publisher */}
        <p className={styles.cardPublisher}>{publisher}</p>

        {/* Enroll Button */}
        <div className={styles.button}>
          <a href={`selectSkill/${skillCount}`} className={styles.enrollButton}>
            Enroll Now
          </a>
        </div>
      </div>
    </div>
  );
}
