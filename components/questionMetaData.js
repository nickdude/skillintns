import React from 'react';
import Styles from '../styles/questionMetaData.module.css';

const PracticeMetaData = ({ breadcrumbLinks, skill, level }) => {
    return (
        <div className={Styles.practiceMetaData}>
            {/* Breadcrumb Links */}
            <div className={Styles.linkContainer}>
                <img src="arrowLeft.svg" alt="Go Back" />
                <div className={Styles.breadcrumbLinks}>
                {breadcrumbLinks.map((link, index) => (
                    <React.Fragment key={index}>
                        <a className={Styles.greenLink} href={link.href}>
                            {link.text}
                        </a>
                        {index < breadcrumbLinks.length - 1 && <p>/</p>}
                    </React.Fragment>
                ))}
                </div>
            </div>

            {/* Meta Data: Skill and Level */}
            <div className={Styles.metaData}>
                {/* Skill Section */}
                <div className={Styles.skill}>
                    <img src="checkbook.svg" alt="Skill Icon" />
                    <span>Skill</span>
                    <p>:</p>
                    <p className={Styles.skillName}>{skill}</p>
                </div>

                {/* Level Section */}
                <div className={Styles.Level}>
                    <img src="signal_cellular_alt.svg" alt="Level Icon" />
                    <span>Level</span>
                    <p>:</p>
                    <p className={Styles.skillName}>{level}</p>
                </div>
            </div>
        </div>
    );
};

export default PracticeMetaData;
