import styles from '../styles/cards.module.css';
import Button from '../components/button';
export default function cards({
  image,
  skillCount,
  isFree,
  title,
  publisher,
  className,
}) {
  return (
    <div className={styles.card}>
        <div className={`${styles.cardContent} ${className || ''}`}>
            {/* Display image */}
            <img src={image} alt={title} className={styles.cardImage} />

            {/* Display title */}
            <h2 className={styles.cardTitle}>{title}</h2>

            {/* Display publisher */}
            <p className={styles.cardPublisher}>{publisher}</p>

            {/* Display skill count */}
            <p className={styles.cardSkills}>{skillCount} Skills</p>

            {/* Enroll Button */} 
            <div className={styles.button}>
                <Button children={'Enroll to Task'}/>
            </div>
        </div>
    </div>
  );
}
