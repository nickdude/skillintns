import React, { useState } from 'react';
import Styles from '../styles/questions.module.css';
import DropDown from '../components/dropDown'

const Question = ({ genre, question, options, onNext }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleOptionClick = (index) => {
        setIsSubmitted(true);
        // if (!isSubmitted) {
            setSelectedOption(index);
        // }
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

    return (
        <div className={Styles.Question}>
            {/* Question Bar */}
            <div className={Styles.Qbar}>
                <div className={Styles.QuestionCell}>
                    <div className={Styles.QuestionGenre}>
                        {genre} 
                        {/* <DropDown/> */}
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
                        <span className={Styles.OptionText}>{option.text}</span>
                    </div>
                ))}
            </div>

            {/* Buttons */}
            <div className={Styles.Buttons}>
                <div onClick={handleReset} className={`${Styles.reset}`}>
                Reset to previous level
                </div>
                {/* {!isSubmitted ? (
                    <button
                        onClick={handleSubmit}
                        className={`${Styles.Button} ${Styles.submit}`}
                        disabled={selectedOption === null}
                    >
                        Submit
                    </button>
                ) : (
                    <button onClick={handleNext} className={`${Styles.Button} ${Styles.submit}`}>
                        Next
                    </button>
                )} */}
                 <button onClick={handleNext} className={`${Styles.Button} ${Styles.submit}`}>
                        Next
                 </button>
            </div>
        </div>
    );
};

export default Question;
