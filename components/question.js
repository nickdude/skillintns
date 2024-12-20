import React from "react";
import { MathJaxContext } from "better-react-mathjax";
import Styles from "../styles/questions.module.css";

const Question = ({
    genre,
    question,
    options,
    selected,
    onNext,
    onPrev,
    onOptionSelect,
    isPreviousDisabled,
    isLastQuestion,
}) => {

    const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const corsProxyUrl = process.env.NEXT_PUBLIC_CORS_PROXY_URL;
    const apiUrl = corsProxyUrl ? corsProxyUrl + baseApiUrl : baseApiUrl;

    const correctOptionIndex = options.findIndex((option) => option.isCorrect);

    const handleOptionClick = (index) => {
        onOptionSelect(index);
    };
  
    const handleReset = async () => {
        const token = localStorage.getItem("token");
        const studentId = localStorage.getItem("student_id");
        const skillName = localStorage.getItem("skill_name");
    
        try {
            const response = await fetch(
                `${apiUrl}/reset_to_previous_level?skill_name=${skillName}&student_id=${studentId}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            if (!response.ok) {
                throw new Error('Failed to reset to previous level');
            }
    
            const data = await response.json();
            console.log('Reset successful', data);
            // You can update state or UI based on the response if necessary
        } catch (error) {
            console.error('Error resetting to previous level:', error.message);
        }
    };

    
    return (
        <MathJaxContext>
            <div className={Styles.Question}>
                {/* Question Bar */}
                <div className={Styles.Qbar}>
                    <div className={Styles.QuestionCell}>
                        <div className={Styles.QuestionGenre}>
                            {genre}
                        </div>
                        <div className={Styles.QuestValue}>Q. {question}</div>
                    </div>
                </div>

                {/* Options List */}
                <div className={Styles.Options}>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`${Styles.Option} ${
                                selected === index && index === correctOptionIndex
                                    ? Styles.correct 
                                    : selected === index && index !== correctOptionIndex
                                    ? Styles.incorrect 
                                    : selected !== null && index === correctOptionIndex
                                    ? Styles.correct 
                                    : ""
                            }`}
                            onClick={() => handleOptionClick(index)}
                        >
                            <span className={Styles.OptionLabel}>
                                {String.fromCharCode(65 + index)}.
                            </span>
                            <span className={Styles.OptionText}>
                                {option.text}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <div className={Styles.Buttons}>
                    <div className={`${Styles.reset}`} onClick={handleReset}>
                         Reset to previous level
                    </div>
                    <div className={`${Styles.buttonContainer}`}>
                        <button 
                            onClick={onPrev} 
                            disabled={isPreviousDisabled}
                            className={`${Styles.Button} ${Styles.previous} ${
                                isPreviousDisabled ? Styles.disabled : ''
                            }`}>
                                Previous
                        </button>
                        <button
                            onClick={onNext}
                            className={`${Styles.Button} ${Styles.submit} ${selected === null ? Styles.disabled : '' }`}>
                                {isLastQuestion ? 'Submit' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        </MathJaxContext>
    );
};

export default Question;