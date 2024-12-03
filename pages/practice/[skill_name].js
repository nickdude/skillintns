import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from '@/components/navbar';
import Styles from '../../styles/practice.module.css';
import TaskTable from '@/components/taskTable';
import QuestionMetaData from '@/components/questionMetaData';
import Question from '@/components/question';

const breadcrumbLinks = [
    { text: 'Tasks', href: '#' },
    { text: 'Practice Skill', href: '#' },
    { text: 'Practice', href: '#' }
];

export default function Practice() {
    const router = useRouter();
    const { skill_name } = router.query;
    const [tasks, setTasks] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Construct the API URL using environment variables
    const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const corsProxyUrl = process.env.NEXT_PUBLIC_CORS_PROXY_URL;
    const apiUrl = corsProxyUrl ? corsProxyUrl + baseApiUrl : baseApiUrl;

    useEffect(() => {
        const token = localStorage.getItem("token");
        const studentId = 10;

        if (!skill_name) return;

        const fetchQuestionData = async () => {
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
                        text: choice.slice(3),
                        isCorrect: choice.startsWith(item.correct_answer),
                    })),
                }));

                setQuestions(transformedQuestions);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestionData();
    }, [skill_name, apiUrl]);

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            alert("You've reached the end of the questions!");
        }
    };

    const handleTaskClick = (taskId) => {
        router.push(`/selectSkill/${taskId}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Navbar />
            <div className={`${Styles.mainContainer} mainContent`}>
                <div className={Styles.enrolledTasks}>
                    <p className={Styles.boldTextSmall}>Enrolled Tasks</p>
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
                            { subject: 'English' },
                        ]}
                    /> */}
                </div>
                <div className={Styles.practiceContent}>
                    <QuestionMetaData
                        breadcrumbLinks={breadcrumbLinks}
                        skill={skill_name}
                        level="Understanding" // You can make this dynamic if needed
                    />
                    <div className={Styles.Title}>
                        <div className={Styles.TitleContent}>
                            <p className={Styles.boldText}>Practice and Excel</p>
                        </div>
                    </div>
                    <div className={Styles.question}>
                        {questions.length > 0 ? (
                            <Question
                                genre={questions[currentQuestionIndex].genre}
                                question={questions[currentQuestionIndex].question}
                                options={questions[currentQuestionIndex].options}
                                onNext={handleNext}
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


// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import Navbar from '@/components/navbar';
// import Styles from '../../styles/practice.module.css';
// import TaskTable from '@/components/taskTable';
// import QuestionMetaData from '@/components/questionMetaData';
// import Question from '@/components/question';

// const breadcrumbLinks = [
//     { text: 'Tasks', href: '#' },
//     { text: 'Practice Skill', href: '#' },
//     { text: 'Practice', href: '#' }
// ];

// export default function Practice() {

//     const router = useRouter();
//     const { skill_name } = router.query; // Get the skill_name from the URL
//     const [questionData, setQuestionData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
   
//     // Construct the API URL using environment variables
//     const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
//     const corsProxyUrl = process.env.NEXT_PUBLIC_CORS_PROXY_URL;
//     const apiUrl = corsProxyUrl ? corsProxyUrl + baseApiUrl : baseApiUrl;

//     useEffect(() => {
//         // Get token from localStorage
//         const token = localStorage.getItem("token"); 
//         // Get student_id from localStorage or default to 10
//         //const studentId = localStorage.getItem("student_id") || 10;
//         const studentId = 10;
      
//         if (!skill_name) return; // Ensure skill_name is available
       
//         const fetchQuestionData = async () => {
//             setLoading(true);
//             setError(null);
            
//             try {
//                 const response = await fetch(`${apiUrl}/generate-multiple-choice?skill_name=${skill_name}&student_id=${studentId}`, {
//                     method: 'GET',
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                     },
//                 });

//                 if (!response.ok) {
//                     throw new Error("Failed to fetch question data");
//                 }
              
//                 const data = await response.json();
//                 setQuestionData(data);
//                 console.log(data,'<<<<<<<')
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchQuestionData();
//     }, [skill_name, apiUrl]);

//     const handleNext = () => {
//         console.log('Load next question');
//         // You can update the state to fetch the next question here if needed
//     };

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div>
//             <Navbar />
//             <div className={`${Styles.mainContainer} mainContent`}>
//                 <div className={Styles.enrolledTasks}>
//                     <p className={Styles.boldTextSmall}>Enrolled Tasks</p>
//                     <TaskTable
//                         data={[
//                             { subject: 'Maths' },
//                             { subject: 'Physics' },
//                             { subject: 'Chemistry' },
//                             { subject: 'Biology' },
//                             { subject: 'English' },
//                         ]}
//                     />
//                 </div>
//                 <div className={Styles.practiceContent}>
//                     <QuestionMetaData
//                         breadcrumbLinks={breadcrumbLinks}
//                         skill={skill_name}
//                         level="Remembering"  // You can make this dynamic if needed
//                     />
//                     <div className={Styles.Title}>
//                         <div className={Styles.TitleContent}>
//                             <p className={Styles.boldText}>Practice and Excel</p>
//                         </div>
//                         <div className={Styles.TitleButtonCell}>
//                             <div className={Styles.TitleButton}>
//                                 <div className={Styles.TitleIcon}>
//                                     <img src="../previous.svg" />
//                                 </div>
//                                 previous
//                             </div>
//                             <div className={Styles.TitleButton}>
//                                 <div className={Styles.TitleIcon}>
//                                     <img src="../reload.svg" />
//                                 </div>
//                                 Load Question
//                             </div>
//                         </div>
//                     </div>
//                     <div className={Styles.question}>
//                     {questionData ? (
//                         <>{console.log(questionData)}
//                           <Question
//                             subject={questionData.subject}
//                             question={questionData.question}
//                             options={questionData.multiple_choices}
//                             onNext={handleNext}
//                           />
//                         </>
//                     ) : (
//                         <p>No question available</p>
//                     )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


// import Navbar from '@/components/navbar';
// import Styles from '../../styles/practice.module.css';
// import TaskTable from '@/components/taskTable';
// import QuestionMetaData from '@/components/questionMetaData';
// import Question from '@/components/question';

// const breadcrumbLinks = [
//     { text: 'Tasks', href: '#' },
//     { text: 'Practice Skill', href: '#' },
//     { text: 'Practice', href: '#' }
// ];

// const questionData = {
//     genre: 'Mechanics',
//     question: 'What is Newton’s First Law of Motion commonly known as?',
//     options: [
//         { text: 'The Law of Universal Gravitation', isCorrect: false },
//         { text: 'The Law of Acceleration', isCorrect: false },
//         { text: 'The Law of Inertia', isCorrect: true },
//         { text: 'The Law of Action and Reaction', isCorrect: false },
//     ],
// };

// const skill = 'Newtons Law';
// const level = 'Remembering';

// export default function Practice() {

//     const handleNext = () => {
//         console.log('Load next question');
//     };

//     return (
//         <div>
//             <Navbar />
//             <div className={`${Styles.mainContainer} mainContent`}>
//                 <div className={Styles.enrolledTasks}>
//                     <p className={Styles.boldTextSmall}>Enrolled Tasks</p>
//                     <TaskTable
//                         data={[
//                             { subject: 'Maths' },
//                             { subject: 'Physics' },
//                             { subject: 'Chemistry' },
//                             { subject: 'Biology' },
//                             { subject: 'English' },
//                         ]}
//                     />
//                 </div>
//                 <div className={Styles.practiceContent}>
//                     <QuestionMetaData
//                         breadcrumbLinks={breadcrumbLinks}
//                         skill={skill}
//                         level={level}
//                     />
//                     <div className={Styles.Title}>
//                         <div className={Styles.TitleContent}>
//                             <p className={Styles.boldText}>Practice and Excel</p>
//                         </div>
//                         <div className={Styles.TitleButtonCell}>
//                             <div className={Styles.TitleButton}>
//                                 <div className={Styles.TitleIcon}>
//                                     <img src="../previous.svg" />
//                                 </div>
//                                 previous
//                             </div>
//                             <div className={Styles.TitleButton}>
//                                 <div className={Styles.TitleIcon}>
//                                     <img src="../reload.svg" />
//                                 </div>
//                                 Load Questions
//                             </div>
//                         </div>
//                     </div>
//                     <div className={Styles.question}>
//                         <Question
//                             genre={questionData.genre}
//                             question={questionData.question}
//                             options={questionData.options}
//                             onNext={handleNext}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
