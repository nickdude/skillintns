import { useEffect, useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import styles from "../styles/conceptCard.module.css";

export default function ConceptCard({ isOpen, onClose, taskId, id, question , skill_name}) {
  const [error, setError] = useState(null);
  const [concepts, setConcepts] = useState([]);
  const [examples,setExamples] = useState([])
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('')
  const [images, setImages] = useState([])
  const [links, setLinks] = useState([])

  const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
  const corsProxyUrl = process.env.NEXT_PUBLIC_CORS_PROXY_URL;
  const apiUrl = corsProxyUrl ? `${corsProxyUrl}${baseApiUrl}` : baseApiUrl;
      console.log(skill_name)
  useEffect(() => {
    if (!isOpen || !taskId) return;

    const token = localStorage.getItem("token");

    const fetchHints = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${apiUrl}/get_topic_summary?skill=${skill_name}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch hints.");
        }

       const data = await response.json();

        setConcepts(data[0]?.concepts || []);
        setExamples(data[0]?.examples || [])
        setSummary(data[0]?.summary || '');
        setImages(data[0]?.images || []);
        setLinks(data[0]?.relevant_links || []);
        console.log(data[0])
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHints();
  }, [isOpen, taskId, apiUrl]);

  if (!isOpen) return null;

  return (
    <MathJaxContext>
      <div className={styles.overlay}>
        <div className={styles.popup}>
          <div className={styles.topBar}>
            <h1>Concepts</h1>
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
                  <h1 className={styles.title}>Skill: {skill_name}</h1>
                  <h2 className={styles.subTitle}>Summary:</h2>
                  <p className={styles.summary}>
                     <MathJax>{summary}</MathJax>
                  </p>

                  <h2 className={styles.subTitle}>Example Problems and Solution:</h2>
                  {examples.length > 0 ? (
                    examples.map((example, index) => (
                    <>
                      <p className={styles.question}>
                          <strong>Problem: </strong>
                          <MathJax inline>{example.problem}</MathJax>
                      </p>
                      <p className={styles.answer}>
                          <strong>Solution: </strong>
                          <MathJax inline>{example.solution}</MathJax>
                      </p>
                    </>
                    ))
                  ) : (
                    <p>No hints available for this task.</p>
                  )} 

                  <h2 className={styles.subTitle}>Links:</h2>
                  {links.length > 0 ? (
                      links.map((link,index)=>(
                        <p className={styles.question}>
                        <strong>Link: </strong>
                        <a href={link?.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                          {link?.title}
                        </a>
                      </p>
                      ))
                  ) : (
                    <p>No hints Links for this task.</p>
                  )}

                  <h2 className={styles.subTitle}>Images:</h2>
                    {images.length > 0 ? (
                      images.map((image,index)=>(
                        <>
                        <p className={styles.question}>
                          <strong>Description: </strong>
                          <img src={`${image.url}`} />
                          <MathJax inline>{image?.description}</MathJax>
                        </p>
                        </>
                      ))
                  ) : (
                     <p>No hints Images for this task.</p>
                     )}
              </div>
            )}
          </div>
        </div>
      </div>
    </MathJaxContext>
  );
}