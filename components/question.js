import React, { useState } from 'react';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import Styles from '../styles/questions.module.css';
import DropDown from '../components/dropDown'

const Question = ({ genre, question, options, onNext, id, skill_name }) => {
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
                        </span>{console.log(option.text,"<<<<<<<<")}
                        <span className={Styles.OptionText}><MathJax inline>{option.text}</MathJax></span>
                    </div>
                ))}
            </div>

            {/* Buttons */}
            <div className={Styles.Buttons}>
                <div onClick={handleReset} className={`${Styles.reset}`}>
                Reset to previous level
                </div>
                 <button onClick={handleNext} className={`${Styles.Button} ${Styles.submit}`}>
                        Next
                 </button>
            </div>
        </div>
        </MathJaxContext>
    );
};

export default Question;
