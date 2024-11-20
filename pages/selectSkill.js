import Styles from '../styles/selectSkill.module.css';
import Navbar from '../components/navbar';
import TaskTable from '../components/taskTable';
import LinkBreadCrumps from '@/components/linkBreadcrumps';
import LearningBar from "../components/learningModules";

const breadcrumbLinks = [
    { text: 'Tasks', href: '#' },
    { text: 'Practice Skill', href: '#' }
];


export default function SelectSkill() {
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
                <div className={Styles.rightContainer}>
                    <div className={Styles.skills}>
                        <LinkBreadCrumps breadcrumbLinks={breadcrumbLinks} /> 
                    </div>
                    <div className={Styles.learningModules}>
                        <LearningBar title="Newtons Law" progress={0.5} />
                        <LearningBar title="Newtons Law" progress={1} />
                        <LearningBar title="Newtons Law" progress={0.5} />
                        <LearningBar title="Newtons Law" progress={0.5} />
                        <LearningBar title="Newtons Law" progress={0.5} />
                        <LearningBar title="Newtons Law" progress={0.5} />
                        <LearningBar title="Newtons Law" progress={0.5} />
                    </div>
                </div>
            </div>

        </div>
    );
}
