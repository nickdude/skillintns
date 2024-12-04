import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Styles from '../../styles/selectSkill.module.css';
import Navbar from '../../components/navbar';
import TaskTable from '../../components/taskTable';
import LinkBreadCrumps from '@/components/linkBreadcrumps';
import LearningBar from "../../components/learningModules";

const breadcrumbLinks = [
    { text: 'Tasks', href: '#' },
    { text: 'Practice Skill', href: '#' }
];

export default function SelectSkill() {
    const router = useRouter();
    const { task_id } = router.query;  
    const [tasks, setTasks] = useState([]);
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // API Base URL
    const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const corsProxyUrl = process.env.NEXT_PUBLIC_CORS_PROXY_URL;
    const apiUrl = corsProxyUrl ? corsProxyUrl + baseApiUrl : baseApiUrl;
  
    useEffect(() => {
        const fetchSkills = async () => {
            if (!task_id) return; // Ensure task_id is available

            setLoading(true);
            setError(null);
            const token = localStorage.getItem("token"); 
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

        fetchSkills();
    }, [task_id, apiUrl]);

    const handleTaskClick = (taskId) => {
        router.push(`/selectSkill/${taskId}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Navbar />
            <div className={`${Styles.mainContainer} mainContent`}>
                {/* Enrolled Tasks Section */}
                <div className={Styles.enrolledTasks}>
                    <p className={Styles.boldTextSmall}>Tasks In Package</p>
                    <TaskTable
                        data={tasks.map((task) => ({
                            subject: task.adaptive_task_name,
                            onClick: () => handleTaskClick(task.adaptive_task_id),
                        }))}
                    />
                    {/* <TaskTable 
                        data={[
                            { subject: 'Maths' }, 
                            { subject: 'Physics' }, 
                            { subject: 'Chemistry' }, 
                            { subject: 'Biology' }, 
                            { subject: 'English' }
                        ]}
                    /> */}
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
                                    progress={0.5}  // Sample progress value
                                    href={`/practice/${skill[2]}`}  // Assuming you have a practice page for each skill
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
