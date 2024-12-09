import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../components/cards";
import Navbar from "../components/navbar";
import Styles from "/styles/index.module.css";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
  
        const token = localStorage.getItem("token");
        
        if (!token) {
          setError("No token found. Please log in.");
          return;
        }

        const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
        const corsProxyUrl = process.env.NEXT_PUBLIC_CORS_PROXY_URL;
        const apiUrl = corsProxyUrl ? corsProxyUrl + baseApiUrl : baseApiUrl;
      
        const response = await axios.get(`${apiUrl}/adaptive_packages/1/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data); 
      } catch (err) {
        console.log(err)
        setError("Failed to load tasks. Please try again.");
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <Navbar />
      <main>
        <div className="mainContent">
          <div className={Styles.contentHead}>
            <div className={Styles.textContainer}>
              <p style={{"marginTop":"-2vh"}}>
                <span className={Styles.boldText}>Enroll Tasks </span>
                <span className={Styles.basicTextLarge}>
                  -Practice. Progress. Succeed.
                </span>
              </p>
              <br />
              <p className={Styles.basicTextSmall}>
                Step-by-Step{" "}
                <span className={Styles.basicTextSmallGreen}>Learning</span> to
                Build Confidence and Knowledge
              </p>
            </div>
            <div className={Styles.ButtonContainer}>
              <button className={Styles.button}>Subscribe Now</button>
            </div>
          </div>
          <div className={Styles.cards}>
            {error && <p className={Styles.error}>{error}</p>}
            {tasks.map((task) => (
              <Cards
                key={task.adaptive_task_id} // Unique key for each card
                Styles={Styles.card}
                image="/image1.png" // Default image path
                skillCount={task.adaptive_task_id} // Placeholder for skills count
                isFree={true} // Placeholder for free status
                title={task.adaptive_task_description} // API data
                publisher={task.adaptive_task_name} // API data
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
