import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
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
     
                <div style={{ width: 50, height: 50 }}>
                  <CircularProgressbar
                    value={progress * 100}
                    text={`${Math.round(progress * 100)}%`}
                    styles={buildStyles({
                      textSize: '24px', 
                      pathColor: '#4caf50', 
                      textColor: '#000', 
                      trailColor: '#d6d6d6',
                    })}
                  />
                  <style jsx>{`
                    .CircularProgressbar-text {
                      dominant-baseline: central;
                      text-anchor: middle;
                    }
                  `}</style>
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
