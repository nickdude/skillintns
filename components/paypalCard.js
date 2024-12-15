import { useEffect, useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import styles from "../styles/paypalCard.module.css";

export default function PayPalCard({ isOpen, onClose, taskId, id, question }) {
  const [error, setError] = useState(null);
  const [hints, setHints] = useState([]);
  const [loading, setLoading] = useState(false);

  // const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
  // const corsProxyUrl = process.env.NEXT_PUBLIC_CORS_PROXY_URL;
  // const apiUrl = corsProxyUrl ? `${corsProxyUrl}${baseApiUrl}` : baseApiUrl;

  // useEffect(() => {
  //   if (!isOpen || !taskId) return;

  //   const token = localStorage.getItem("token");

  //   const fetchHints = async () => {
  //     setLoading(true);
  //     setError(null);

  //     try {
  //       const response = await fetch(`${apiUrl}/hints/${taskId}`, {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch hints.");
  //       }

  //       const data = await response.json();
  //       setHints(data.hints || []);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchHints();
  // }, [isOpen, taskId, apiUrl]);

  if (!isOpen) return null;

  return (
    <MathJaxContext>
      <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.topBar}>
          <h1>Subscribe</h1>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className={styles.subscriptSection}>
    
        </div>

  
      </div>
    </div>
    </MathJaxContext>
  );
}
