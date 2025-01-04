import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Styles from '../../styles/selectSkill.module.css';
import Navbar from '../../components/navbar';
import TaskTable from '../../components/taskTable';
import LinkBreadCrumps from '@/components/linkBreadcrumps';
import LearningBar from "../../components/learningModules";



export default function SelectSkill() {
    const router = useRouter();
    const { task_id,currentId, adaptive_task_name } = router.query;  
    const [tasks, setTasks] = useState([]);
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profile,setProfile] = useState([])

    const bloomLevels = ['Remembering', 'Understanding', 'Applying', 'Analyzing', 'Evaluating'];

    // API Base URL
    const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const corsProxyUrl = process.env.NEXT_PUBLIC_CORS_PROXY_URL;
    const apiUrl = corsProxyUrl ? corsProxyUrl + baseApiUrl : baseApiUrl;
  
    const breadcrumbLinks = [
        { text: 'Packages', href: `/subscribePage` },
        { text: 'Tasks', href: `/landing/${currentId}` },
        { text: 'Skills', href: '#' }
    ];

    const getProgressForSkill = (skillName) => {
        const profileItem = profile.find((p) => p.bloom_skill_name.toLowerCase().includes(skillName.toLowerCase()));
        if (profileItem) {
          const bloomLevel = profileItem.bloom_skill_name.split('-')[0];
          const index = bloomLevels.indexOf(bloomLevel);
          if (index !== -1) {
            // Each level contributes 20% (100% / 5 levels)
            return ((index + 1) / bloomLevels.length);
          }
        }
        return 0;
      };

    useEffect(() => {
        const token = localStorage.getItem("token"); 
        localStorage.setItem("adaptive_task_name",adaptive_task_name)
        const fetchSkills = async () => {
            if (!task_id) return; // Ensure task_id is available

            setLoading(true);
            setError(null);
        
            try {
                const response = await fetch(`${apiUrl}/adaptive_packages/1/tasks`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch tasks");
                }

                const data = await response.json();
                setTasks(data);
            } catch (err) {
               // setError(err.message);
               console.log(err.message)
            } 

            try {
                
                const response = await fetch(`${apiUrl}/get_task_skills`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ task_id })
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch skills");
                }

                const data = await response.json();
                setSkills(data.skills || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchProfile = async () => {
            const student_id = localStorage.getItem('student_id');
            if (!student_id) {
             console.log("student_id is not there in local storage")
              return;
            }
      
            try {
                const response = await fetch(`${apiUrl}/get_student_profile?student_id=${student_id}`,{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                  const profileResponse = await response.json();
                  if (profileResponse && Array.isArray(profileResponse.skills)) {
                    setProfile(profileResponse.skills); // Set the profile to the skills array
                  } else {
                    console.log("Profile failed");
                  }
                } else {
                  console.log("Failed to fetch profile:", response.statusText);
                }
              } catch (error) {
                console.log(error.message);
              }
              
          };

        fetchSkills();
        fetchProfile()
    }, [task_id, apiUrl]);

    const handleTaskClick = (taskId) => {
        router.push(`/selectSkill/${taskId}?currentId=${currentId}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Navbar />
            <div className={`${Styles.mainContainer} mainContent`}>
                <div className={Styles.enrolledTasks}>
                    <p className={Styles.boldTextSmall}>TASKS IN (PACKAGE)</p>
                    <TaskTable
                        data={tasks.map((task) => ({
                            subject: task.adaptive_task_name,
                            onClick: () => handleTaskClick(task.adaptive_task_id),
                        }))}
                    />
                </div>
                <div className={Styles.rightContainer}>
                    <div className={Styles.skills}>
                        <LinkBreadCrumps breadcrumbLinks={breadcrumbLinks} /> 
                    </div>
                    <div className={Styles.textContent}>
                        <div className={Styles.boldText}>
                            <p>Practice Skill</p>
                        </div>
                        <div className={Styles.basicTextSmall}>
                            <p>Select a skill below to Practice</p>
                        </div>
                    </div>
                    <div className={Styles.learningModules}>
                        {skills.length > 0 ? (
                            skills.map((skill, index) => (
                                <LearningBar
                                    key={index}
                                    title={skill[1]}  // Skill name
                                    progress={getProgressForSkill(skill[2])}  
                                    href={`/practice/${skill[2]}?task_id=${task_id}&currentId=${currentId}`}  // Assuming you have a practice page for each skill
                                />
                            ))
                        ) : (
                            <p>No skills available for this task.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
