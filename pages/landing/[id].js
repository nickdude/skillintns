import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Cards from "../../components/cards";
import Navbar from "../../components/navbar";
import Styles from "/styles/index.module.css";

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [currentId, setCurrentId] = useState(id);

  useEffect(() => {
    if (!id) {
      const pathId = router.asPath.split("/")[2]; 
      if (pathId) {
        setCurrentId(pathId); 
      }
    } else {
      setCurrentId(id); 
    }
  }, [id, router.asPath]);
   
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
      
        const response = await axios.get(`${apiUrl}/adaptive_packages/${currentId}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data); 
        setError("")
      } catch (err) {
        console.log(err)
        setError("Failed to load tasks. Please try again.");
      }
    };

    if (currentId) {
      console.log(typeof currentId,"<<<<<<<<")
      fetchTasks();
    }
  }, [currentId]);

  return (
    <div>
      <Navbar />
      <main>
        <div className="mainContent">
          <div className={Styles.contentHead}>
            <div className={Styles.textContainer}>
              <p>
                <span className={Styles.boldText}>Available Tasks for High School</span>
              </p>
              <br />
              <p className={Styles.basicTextSmall}>
                 Step-by-Step <span style={{"color":"#44B07A"}}>Learning</span> to Build Confidence and Knowledge
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
                currentId={currentId}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}