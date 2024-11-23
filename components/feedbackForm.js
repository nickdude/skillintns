import styles from '../styles/feedbackForm.module.css';

export default function FeedbackForm({ isOpen, onClose }) {
  if (!isOpen) return null; // Do not render if not open

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        {/* Top Bar */}
        <div className={styles.topBar}>
          <h1>Submit Feedback</h1>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        {/* Middle Section */}
        <div className={styles.middleSection}>
            <div className={styles.feedbackText}>
                <h2>Your Feedback</h2>
                <p>Your feedback will be sent to our team.</p>
            </div>
            <label className={styles.textboxLabel} htmlFor="feedbackTextarea">Remark</label>
            <textarea
              className={styles.textbox}
              placeholder="Enter your feedback here..."
            />
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.submitButton}>Submit</button>
        </div>
      </div>
    </div>
  );
}
