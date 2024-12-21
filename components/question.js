import React, { useState } from 'react';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import Styles from '../styles/questions.module.css';
import DropDown from '../components/dropDown'

const Question = ({ genre, question, options, onNext,onPrev, id, skill_name,isPreviousDisabled,isLastQuestion }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleOptionClick = (index) => {
        setIsSubmitted(true);
         if (!isSubmitted) {
            setSelectedOption(index);
         }
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    const handleReset = () => {
        setSelectedOption(null);
        setIsSubmitted(false);
    };

    const handleNext = () => {
        onNext();
        handleReset();
    };

    const handlePrevious = () =>{
        onPrev();
    }

    return (
        <MathJaxContext>
        <div className={Styles.Question}>
            {/* Question Bar */}
            <div className={Styles.Qbar}>
                <div className={Styles.QuestionCell}>
                    <div className={Styles.QuestionGenre}>
                        {genre} 
                        <DropDown question={question} id={id} skill_name={skill_name}/>
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
                            isSubmitted
                                ? option.isCorrect
                                    ? Styles.correct
                                    : index === selectedOption
                                    ? Styles.incorrect
                                    : ''
                                : index === selectedOption
                                ? Styles.selected
                                : ''
                        }`}
                        onClick={() => handleOptionClick(index)}
                    >
                        <span className={Styles.OptionLabel}>
                            {String.fromCharCode(65 + index)}.
                        </span>
                        <span className={Styles.OptionText}><MathJax inline>{option.text}</MathJax></span>
                    </div>
                ))}
            </div>

            {/* Buttons */}
            <div className={Styles.Buttons}>
                <div onClick={handleReset} className={`${Styles.reset}`}>
                Reset to previous level
                </div>
                <div className={`${Styles.buttonContainer}`}>
                    <button onClick={handlePrevious} 
                      disabled={isPreviousDisabled}
                      className={`${Styles.Button} ${Styles.previous} ${
                          isPreviousDisabled ? Styles.disabled : ''
                      }`}>
                            Previous
                    </button>
                    <button
                        onClick={handleNext}
                        className={`${Styles.Button} ${Styles.submit}`}>
                            {isLastQuestion ? 'Submit' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
        </MathJaxContext>
    );
};

export default Question;