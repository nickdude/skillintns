import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import styles from "../styles/LearningBar.module.css";

const LearningBar = ({ title, progress, href }) => {
  const isComplete = progress === 1;
  const buttonText = isComplete ? "Practice Again" : "Practice Now";
  const buttonClass = isComplete ? styles.greenButton : styles.defaultButton;
  const barClass = isComplete ? styles.completed : "";

  return (
    <div className={`${styles.barContainer} ${barClass}`}>
      {/* Left Status Bar */}
      <div className={`${styles.leftBar} ${barClass}`}></div>
      {/* Title */}
      <div className={styles.title}>{title}</div>

      {/* Grouped Section */}
      <div className={styles.groupedSection}>
        {/* Progress Circle */}
        <div className={styles.progressContainer}>
          {isComplete ? (
            <img
              src="/check_circle.svg"
              alt="Completed"
              className={styles.checkMark}
            />
          ) : (
            // <div 
            //   className={styles.progressCircle}
            //   style={{ '--progress': `${progress * 100}%` }}
            //   >
            //   <span>{Math.round(progress * 100)}%</span>
            // </div>
          //   <div style={{ width: 50, height: 50,display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          //     <CircularProgressbar
          //       value={progress * 100}
          //       text={`${progress * 100}%`}
          //       styles={buildStyles({
          //         textSize: '24px',
          //         pathColor: '#4caf50',
          //         textColor: '#000',
          //         trailColor: '#d6d6d6',
          //         textAlign: 'center',
          //         textAnchor: 'middle'
          //       })}
          //       x={50}
          //       y={50}
          //     />
          // </div>
          <div style={{ width: 50, height: 50 }}>
            <CircularProgressbar
              value={progress * 100}
              text={`${Math.round(progress * 100)}%`}
              styles={buildStyles({
                textSize: '24px', // Adjust for proper size within the circle
                pathColor: '#4caf50', // Progress bar color
                textColor: '#000', // Centered text color
                trailColor: '#d6d6d6', // Background path color
                textAnchor: 'middle'
              })}
            />
          </div>
          )}
        </div>

        {/* Vertical Separator */}
        <div className={styles.verticalSeparator}></div>

        {/* Action Button */}
        <a href={href} className={`${styles.actionButton} ${buttonClass}`}>
          {buttonText}
        </a>
      </div>
    </div>
  );
};

export default LearningBar;
