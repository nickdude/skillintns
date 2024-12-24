import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from '@/components/navbar';
import Styles from '../../styles/practice.module.css';
import TaskTable from '@/components/taskTable';
import QuestionMetaData from '@/components/questionMetaData';
import Question from '@/components/question';

export default function Practice() {
    const router = useRouter();
    const { skill_name, task_id, currentId } = router.query;
    const [tasks, setTasks] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false)
    const [isPopUpVisible, setIsPopUpVisible] = useState(false)

    const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const corsProxyUrl = process.env.NEXT_PUBLIC_CORS_PROXY_URL;
    const apiUrl = corsProxyUrl ? corsProxyUrl + baseApiUrl : baseApiUrl;

    const breadcrumbLinks = [
        { text: 'Packages', href: `/subscribePage` },
        { text: 'Tasks', href: `/landing/${currentId}` },
        { text: 'Practice Skill', href: `/selectSkill/${task_id}?currentId=${currentId}` },
        { text: 'Practice', href: '#' }
    ];

    useEffect(() => {
        setCurrentQuestionIndex(0)
        const token = localStorage.getItem("token");
        const studentId = localStorage.getItem("student_id");

        if (!skill_name) return;
        const fetchQuestionData = async () => {
            setLoading(true);
            setError(null);

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
                    throw new Error("Failed to fetch tasks");
                }

                const data = await response.json();
                setTasks(data?.skills || []);
            
            } catch (err) {
                console.log(err.message);
            } 

            try {
                const response = await fetch(
                    `${apiUrl}/generate-multiple-choice?skill_name=${skill_name}&student_id=${studentId}`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch question data");
                }

                const data = await response.json();
                const transformedQuestions = data.map((item) => ({
                    genre: item.subject,
                    question: item.question,
                    options: item.multiple_choices.map((choice) => ({
                        text: choice,
                        isCorrect: choice.startsWith(item.correct_answer),
                    })),
                    _id: item._id,
                    level: item.level,
                    selected: null
                }));
                
                setQuestions(transformedQuestions);
               
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestionData();
    }, [skill_name, apiUrl,refresh]);

    const handleNext = async () => {
        if (questions[currentQuestionIndex]?.selected === null) return;
        if (currentQuestionIndex === questions.length - 1) {
            const token = localStorage.getItem("token");
            const studentId = localStorage.getItem("student_id"); 
            const skillId = localStorage.getItem("skill_id");
            const skillName = localStorage.getItem("skill_name");
            const progressData = questions.map((question) => ({
                student_id: studentId,
                skill_id: skillId,
                skill_name: skillName,
                correct: question.selected === question.options.findIndex(option => option.isCorrect) ? 1 : 0,
                level: question.level,
            }));
    
            try {
                const response = await fetch(`${apiUrl}/update_progress`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(progressData),
                });
    
                if (!response.ok) {
                    throw new Error('Failed to submit progress');
                }
    
                const responseData = await response.json();
                console.log('Progress updated successfully', responseData);
                setIsPopUpVisible(true)
    
            } catch (err) {
                console.error('Error updating progress:', err.message);
            }
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };
    

    const handleTaskClick = async(skill_name) => {
        const token = localStorage.getItem("token");
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
            throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();
        setTasks(data?.skills || []);
        router.push(`/practice/${skill_name}?task_id=${task_id}`);
    
    } catch (err) {
       setError(err.message);
       console.log(err.message)
    } 
    };

    const handleOptionSelect = (index) => {
        if (questions[currentQuestionIndex].selected === null) {
            setQuestions((prevQuestions) => {
                const updatedQuestions = [...prevQuestions];
                updatedQuestions[currentQuestionIndex].selected = index;
                return updatedQuestions;
            });
        }
    };

    const reload = ()=>{
        setRefresh(!refresh)
        setIsPopUpVisible(false)
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const isPreviousDisabled = currentQuestionIndex === 0;
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const review = () => {
        setCurrentQuestionIndex(0)
        setIsPopUpVisible(false)
    }

    const closePopUp = () =>{
        setIsPopUpVisible(false)
    }
    return (
        <div>
            <Navbar />
            <div className={`${Styles.mainContainer} mainContent`}>
                <div className={Styles.enrolledTasks}>
                    <p className={Styles.boldTextSmall}>Skills</p>
                    <TaskTable
                        data={tasks.map((skill) => ({
                            subject: skill[1],
                            onClick: () => handleTaskClick(skill[2]), 
                        }))}
                    />
                </div>
                <div className={Styles.practiceContent}>
                    <QuestionMetaData
                        breadcrumbLinks={breadcrumbLinks}
                        skill={skill_name}
                        level={questions[currentQuestionIndex]?.level}
                    />
                    <div className={Styles.Title}>
                        <div className={Styles.TitleContent}>
                            <p className={Styles.boldText}>Practice and Excel</p>
                        </div>
                        <div className={Styles.TitleButtonCell}>
                            <div className={Styles.TitleButton} onClick={()=>setRefresh(!refresh)}>
                                <div className={Styles.TitleIcon}>
                                    <img src="../reload.svg" />
                                </div>
                                Load Questions
                            </div>
                        </div>
                    </div>
                    <div className={Styles.question}>
                        {questions.length > 0 ? (
                            <Question
                                genre={questions[currentQuestionIndex]?.genre}
                                question={questions[currentQuestionIndex]?.question}
                                options={questions[currentQuestionIndex]?.options}
                                onNext={handleNext}
                                onPrev={handlePrevious}
                                id={questions[currentQuestionIndex]?._id}
                                skill_name={skill_name}
                                isPreviousDisabled={isPreviousDisabled}
                                isLastQuestion={isLastQuestion}
                                selected={questions[currentQuestionIndex]?.selected}
                                onOptionSelect={handleOptionSelect}
                                review={review}
                                isPopUpVisible={isPopUpVisible}
                                closePopUp={closePopUp}
                                reload={reload}
                            />
                        ) : (
                            <p>No question available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}