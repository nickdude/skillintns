import { useEffect, useState } from "react";
// import { MathJax, MathJaxContext } from "better-react-mathjax";
import styles from "../styles/hintCard.module.css";
import dynamic from 'next/dynamic';

const MathJaxContext = dynamic(() => import('better-react-mathjax').then(mod => mod.MathJaxContext), { ssr: false });
const MathJax = dynamic(() => import('better-react-mathjax').then(mod => mod.MathJax), { ssr: false });



export default function HintCard({ isOpen, onClose, taskId, id, question }) {
  const [error, setError] = useState(null);
  const [hints, setHints] = useState([]);
  const [loading, setLoading] = useState(false);

  const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
  const corsProxyUrl = process.env.NEXT_PUBLIC_CORS_PROXY_URL;
  const apiUrl = corsProxyUrl ? `${corsProxyUrl}${baseApiUrl}` : baseApiUrl;

  useEffect(() => {
    if (!isOpen || !taskId) return;

    const token = localStorage.getItem("token");
    const packageId = localStorage.getItem("adaptive_package_id")

    const fetchHints = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${apiUrl}/hints/${taskId}?package_id=${packageId}`, {
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
  }, [isOpen, taskId, apiUrl]);

  if (!isOpen) return null;

  const config = {
    loader: {
        load: ["input/tex", "output/chtml"],
        paths: { mathjax: "https://cdn.jsdelivr.net/npm/mathjax@3/es5" },
    },
    tex: {
        inlineMath: [["$", "$"], ["\\(", "\\)"]],
    },
    chtml: {
        scale: 1, // Set a proper scale
    },
};


  return (
    <MathJaxContext config={config}>
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
               <h2 className={styles.question}><MathJax>Q. {question}</MathJax></h2>
              {hints.length > 0 ? (
                hints.map((hint, index) => (
                  <p key={index}>
                     <MathJax>{hint}</MathJax>
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
    </MathJaxContext>
  );
}
