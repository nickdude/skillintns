import Navbar from '@/components/navbar';
import Styles from '../styles/practice.module.css';
import TaskTable from '@/components/taskTable';
import QuestionMetaData from '@/components/questionMetaData';
import Question from '@/components/question';

const breadcrumbLinks = [
    { text: 'Tasks', href: '#' },
    { text: 'Practice Skill', href: '#' },
    { text: 'Practice', href: '#' }
];

const questionData = {
    genre: 'Mechanics',
    question: 'What is Newton’s First Law of Motion commonly known as?',
    options: [
        'The Law of Universal Gravitation',
        'The Law of Acceleration',
        'The Law of Inertia',
        'The Law of Action and Reaction',
    ]
};

const skill = 'Newtons Law';
const level = 'Remembering';

export default function Practice() {
    return (
        <div>
            <Navbar />
            <div className={`${Styles.mainContainer} mainContent`}>
                {/* Enrolled Tasks Section */}
                <div className={Styles.enrolledTasks}>
                    <p className={Styles.boldTextSmall}>Enrolled Tasks</p>
                    <TaskTable 
                        data={[
                            { subject: 'Maths' }, 
                            { subject: 'Physics' }, 
                            { subject: 'Chemistry' }, 
                            { subject: 'Biology' }, 
                            { subject: 'English' }
                        ]}
                    />
                </div>

                {/* Practice Content Section */}
                <div className={Styles.practiceContent}>
                    <QuestionMetaData 
                        breadcrumbLinks={breadcrumbLinks} 
                        skill={skill} 
                        level={level} 
                    />

                    {/* Title Section */}
                    <div className={Styles.Title}>
                        <div className={Styles.TitleContent}>
                            <p className={Styles.boldText}>Practice and Excel</p>
                        </div>
                        <div className={Styles.TitleButtonCell}>
                            <div className={Styles.TitleButton}>
                                <div className={Styles.TitleIcon}>
                                    <img src="previous.svg" />
                                </div>
                                previous
                            </div>
                            <div className={Styles.TitleButton}>
                                <div className={Styles.TitleIcon}>
                                    <img src="reload.svg" />
                                </div>
                                Load Question
                            </div>
                        </div>
                    </div>
                    <div className={Styles.question}>
                        <Question 
                        genre={questionData.genre}
                        question={questionData.question}
                        options={questionData.options}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
