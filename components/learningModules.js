import React from "react";
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
            <div className={styles.progressCircle}>
              <span>{Math.round(progress * 100)}%</span>
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
