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
 
   
    const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const corsProxyUrl = process.env.NEXT_PUBLIC_CORS_PROXY_URL;
    const apiUrl = corsProxyUrl ? corsProxyUrl + baseApiUrl : baseApiUrl;

    const breadcrumbLinks = [
        { text: 'Tasks', href: `/landing/${currentId}` },
        { text: 'Practice Skill', href: `/selectSkill/${task_id}?currentId=${currentId}` },
        { text: 'Practice', href: '#' }
    ];
    

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") :""
        const studentId = 10;

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

                // const data = {
                //     "skills": [
                //         [
                //             1,
                //             "Linear Equations",
                //             "linear_equations",
                //             1,
                //             "SAT"
                //         ],
                //         [
                //             3,
                //             "Quadratic Equations",
                //             "quadratic_equations",
                //             1,
                //             "SAT"
                //         ],
                //         [
                //             4,
                //             "Inequalities",
                //             "inequalities",
                //             1,
                //             "SAT"
                //         ],
                //         [
                //             5,
                //             "Ratios Proportions and Percents",
                //             "ratios_proportions_and_percents",
                //             1,
                //             "SAT"
                //         ],
                //         [
                //             6,
                //             "Data Interpretation",
                //             "data_interpretation",
                //             1,
                //             "SAT"
                //         ],
                //         [
                //             7,
                //             "Statistics",
                //             "statistics",
                //             1,
                //             "SAT"
                //         ],
                //         [
                //             8,
                //             "Probability",
                //             "Probability",
                //             1,
                //             "SAT"
                //         ],
                //         [
                //             9,
                //             "Complex Numbers",
                //             "complex_numbers",
                //             1,
                //             "SAT"
                //         ],
                //         [
                //             10,
                //             "Polynomial Division",
                //             "polynomial_division",
                //             1,
                //             "SAT"
                //         ],
                //         [
                //             11,
                //             "Rational Exponents and Radicals",
                //             "rational_exponents_and_radicals",
                //             1,
                //             "SAT"
                //         ],
                //         [
                //             12,
                //             "Properties of Angles",
                //             "properties_of_angles",
                //             1,
                //             "SAT"
                //         ],
                //         [
                //             13,
                //             "Properties of Triangles",
                //             "properties_of_triangles",
                //             1,
                //             "SAT"
                //         ],
                //         [
                //             14,
                //             "Congruence and Similarity",
                //             "congruence_and_similarity",
                //             1,
                //             "SAT"
                //         ],
                //         [
                //             16,
                //             "Properties of Quadrilaterals",
                //             "properties_of_quadrilaterals",
                //             1,
                //             "SAT"
                //         ],
                //         [
                //             17,
                //             "Interior and Exterior Angles of Polygons",
                //             "interior_and_exterior_angles_of_polygons",
                //             1,
                //             "SAT"
                //         ],
                //         [
                //             18,
                //             "Circles",
                //             "Circles",
                //             1,
                //             "SAT"
                //         ],
                //         [
                //             21,
                //             "Coordinate Geometry",
                //             "coordinate_geometry",
                //             1,
                //             "SAT"
                //         ],
                //         [
                //             25,
                //             "Volume and Surface Area",
                //             "volume_and_surface_area",
                //             1,
                //             "SAT"
                //         ],
                //         [
                //             26,
                //             "Transformations",
                //             "transformations",
                //             1,
                //             "SAT"
                //         ]
                //     ]
                // }
                setTasks(data?.skills || []);
            
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

                // const data = [
                //     {
                //         "_id": "66ccb4b3820161f1ed24e459",
                //         "correct_answer": "A",
                //         "level": "Applying",
                //         "level_num": 3,
                //         "multiple_choices": [
                //             "A. 10",
                //             "B. 8",
                //             "C. 7",
                //             "D. 6"
                //         ],
                //         "question": "Find the value of y when x = 2 in the equation y = 3x + 4.",
                //         "skill": "linear_equations",
                //         "skill_id": 1,
                //         "skill_name": "Applying-linear_equations",
                //         "subject": "Math",
                //         "subject_area": "Algebra",
                //         "subject_area_id": 2,
                //         "subject_id": 1
                //     },
                //     {
                //         "_id": "66ccb4b3820161f1ed24e45a",
                //         "correct_answer": "B",
                //         "level": "Applying",
                //         "level_num": 3,
                //         "multiple_choices": [
                //             "A. 3",
                //             "B. 4",
                //             "C. 5",
                //             "D. 6"
                //         ],
                //         "question": "What is the value of x in the equation 2x + 3 = 11?",
                //         "skill": "linear_equations",
                //         "skill_id": 1,
                //         "skill_name": "Applying-linear_equations",
                //         "subject": "Math",
                //         "subject_area": "Algebra",
                //         "subject_area_id": 2,
                //         "subject_id": 1
                //     },
                //     {
                //         "_id": "66ccb4b3820161f1ed24e45b",
                //         "correct_answer": "C",
                //         "level": "Applying",
                //         "level_num": 3,
                //         "multiple_choices": [
                //             "A. 5",
                //             "B. 6",
                //             "C. 7",
                //             "D. 8"
                //         ],
                //         "question": "Solve for x: 4x - 5 = 19.",
                //         "skill": "linear_equations",
                //         "skill_id": 1,
                //         "skill_name": "Applying-linear_equations",
                //         "subject": "Math",
                //         "subject_area": "Algebra",
                //         "subject_area_id": 2,
                //         "subject_id": 1
                //     },
                //     {
                //         "_id": "66ccb4b3820161f1ed24e45c",
                //         "correct_answer": "B",
                //         "level": "Applying",
                //         "level_num": 3,
                //         "multiple_choices": [
                //             "A. y = 2x + 1",
                //             "B. y = 2x",
                //             "C. y = x + 2",
                //             "D. y = 3x - 1"
                //         ],
                //         "question": "If a line passes through the points (1, 2) and (3, 6), what is the equation of the line?",
                //         "skill": "linear_equations",
                //         "skill_id": 1,
                //         "skill_name": "Applying-linear_equations",
                //         "subject": "Math",
                //         "subject_area": "Algebra",
                //         "subject_area_id": 2,
                //         "subject_id": 1
                //     },
                //     {
                //         "_id": "66ccb4b3820161f1ed24e45d",
                //         "correct_answer": "D",
                //         "level": "Applying",
                //         "level_num": 3,
                //         "multiple_choices": [
                //             "A. 3",
                //             "B. 5",
                //             "C. 7",
                //             "D. 1"
                //         ],
                //         "question": "Given the equation 2x + y = 7, find the y-value when x = 2.",
                //         "skill": "linear_equations",
                //         "skill_id": 1,
                //         "skill_name": "Applying-linear_equations",
                //         "subject": "Math",
                //         "subject_area": "Algebra",
                //         "subject_area_id": 2,
                //         "subject_id": 1
                //     },
                //     {
                //         "_id": "66ccb4b3820161f1ed24e45e",
                //         "correct_answer": "A",
                //         "level": "Applying",
                //         "level_num": 3,
                //         "multiple_choices": [
                //             "A. y = 3x + 4",
                //             "B. y = 3x - 4",
                //             "C. y = 4x + 3",
                //             "D. y = 3x + 0"
                //         ],
                //         "question": "Find the equation of the line that passes through the point (0, 4) with a slope of 3.",
                //         "skill": "linear_equations",
                //         "skill_id": 1,
                //         "skill_name": "Applying-linear_equations",
                //         "subject": "Math",
                //         "subject_area": "Algebra",
                //         "subject_area_id": 2,
                //         "subject_id": 1
                //     },
                //     {
                //         "_id": "66ccb4b3820161f1ed24e45f",
                //         "correct_answer": "A",
                //         "level": "Applying",
                //         "level_num": 3,
                //         "multiple_choices": [
                //             "A. 2",
                //             "B. 4",
                //             "C. 5",
                //             "D. 3"
                //         ],
                //         "question": "What is the x-value for the equation y = 2x + 3 when y = 11?",
                //         "skill": "linear_equations",
                //         "skill_id": 1,
                //         "skill_name": "Applying-linear_equations",
                //         "subject": "Math",
                //         "subject_area": "Algebra",
                //         "subject_area_id": 2,
                //         "subject_id": 1
                //     },
                //     {
                //         "_id": "66ccb4b3820161f1ed24e460",
                //         "correct_answer": "A",
                //         "level": "Applying",
                //         "level_num": 3,
                //         "multiple_choices": [
                //             "A. 2",
                //             "B. -2",
                //             "C. 4",
                //             "D. -4"
                //         ],
                //         "question": "Find the value of y in the equation y = -2x + 8 when x = 3.",
                //         "skill": "linear_equations",
                //         "skill_id": 1,
                //         "skill_name": "Applying-linear_equations",
                //         "subject": "Math",
                //         "subject_area": "Algebra",
                //         "subject_area_id": 2,
                //         "subject_id": 1
                //     },
                //     {
                //         "_id": "66ccb4b3820161f1ed24e461",
                //         "correct_answer": "B",
                //         "level": "Applying",
                //         "level_num": 3,
                //         "multiple_choices": [
                //             "A. 5",
                //             "B. -5",
                //             "C. -10",
                //             "D. 10"
                //         ],
                //         "question": "Given the linear equation 5x - 2y = 10, find the value of y when x = 0.",
                //         "skill": "linear_equations",
                //         "skill_id": 1,
                //         "skill_name": "Applying-linear_equations",
                //         "subject": "Math",
                //         "subject_area": "Algebra",
                //         "subject_area_id": 2,
                //         "subject_id": 1
                //     },
                //     {
                //         "_id": "66ccb4b3820161f1ed24e462",
                //         "correct_answer": "B",
                //         "level": "Applying",
                //         "level_num": 3,
                //         "multiple_choices": [
                //             "A. 2",
                //             "B. 8",
                //             "C. -2",
                //             "D. 4"
                //         ],
                //         "question": "If the equation of a line is y = -3x + 5, what is the value of y when x = -1?",
                //         "skill": "linear_equations",
                //         "skill_id": 1,
                //         "skill_name": "Applying-linear_equations",
                //         "subject": "Math",
                //         "subject_area": "Algebra",
                //         "subject_area_id": 2,
                //         "subject_id": 1
                //     }
                // ]

                const transformedQuestions = data.map((item) => ({
                    genre: item.subject,
                    question: item.question,
                    options: item.multiple_choices.map((choice) => ({
                        text: choice.slice(3),
                        isCorrect: choice.startsWith(item.correct_answer),
                    })),
                    _id: item._id
                }));

                setQuestions(transformedQuestions);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestionData();
    }, [skill_name, apiUrl, typeof window]);

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            alert("You've reached the end of the questions!");
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Navbar />
            <div className={`${Styles.mainContainer} mainContent`}>
                <div className={Styles.enrolledTasks}>
                    <p className={Styles.boldTextSmall}>Enrolled Tasks</p>
                    <TaskTable
                        data={tasks.map((skill) => ({
                            subject: skill[1], // Skill name
                            onClick: () => handleTaskClick(skill[2]), // Skill identifier
                        }))}
                    />
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
                                id={questions[currentQuestionIndex]._id}
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