import { useEffect, useState } from "react";
import styles from "../styles/hintCard.module.css";

export default function HintCard({ isOpen, onClose, taskId, id, question }) {
  const [error, setError] = useState(null);
  const [hints, setHints] = useState([]);
  const [loading, setLoading] = useState(false);

  const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
  const corsProxyUrl = process.env.NEXT_PUBLIC_CORS_PROXY_URL;
  const apiUrl = corsProxyUrl ? `${corsProxyUrl}${baseApiUrl}` : baseApiUrl;

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!isOpen || !taskId) return;

    const fetchHints = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${apiUrl}/hints/${taskId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch hints.");
        }

        const data = await response.json();
        setHints(data.hints || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHints();
  }, [isOpen, taskId, apiUrl, token]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.topBar}>
          <h1>Hints</h1>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className={styles.middleSection}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className={styles.errorMessage}>{error}</p>
          ) : (
            <div className={styles.feedbackText}>
               <h2 className={styles.question}>Q. {question}</h2>
              {hints.length > 0 ? (
                hints.map((hint, index) => (
                  <p key={index}>
                     {hint}
                  </p>
                ))
              ) : (
                <p>No hints available for this task.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
