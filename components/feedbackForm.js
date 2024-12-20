import { useState } from "react";
import styles from "../styles/feedbackForm.module.css";

export default function FeedbackForm({ isOpen, onClose }) {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      alert("Please enter your feedback.");
      return;
    }

    setLoading(true);
    setError(null);

     // API Base URL
     const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
     const corsProxyUrl = process.env.NEXT_PUBLIC_CORS_PROXY_URL;
     const apiUrl = corsProxyUrl ? corsProxyUrl + baseApiUrl : baseApiUrl;
   

    const payload = {
      user_id: localStorage.getItem("email"),
      student_id: localStorage.getItem("student_id"),
      task_name: localStorage.getItem("adaptive_task_name"),
      feedback,
      pageTitle: localStorage.getItem("adaptive_package_name"),
    };

    try {
      const token = localStorage.getItem("token"); 
      const response = await fetch(`${apiUrl}/submit_feedback`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Use a secure token
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback.");
      }

      setFeedback("");
      onClose();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

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
          <label className={styles.textboxLabel} htmlFor="feedbackTextarea">
            Remark
          </label>
          <textarea
            className={styles.textbox}
            placeholder="Enter your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <button className={styles.cancelButton} onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </div>
  );
}