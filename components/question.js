import React from 'react';
import Styles from '../styles/questions.module.css';

const Question = ({ genre, question, options }) => {
    return (
        <div className={Styles.Question}>
            {/* Question Bar */}
            <div className={Styles.Qbar}>
                {/* Menu Icon */}

                {/* Question Genre and Value */}
                <div className={Styles.QuestionCell}>
                    <div className={Styles.QuestionGenre}>{genre}</div>
                    <div className={Styles.QuestValue}>Q. {question}</div>
                </div>
                <div className={Styles.menu}></div>
            </div>

            {/* Options List */}
            <div className={Styles.Options}>
                {options.map((option, index) => (
                    <div key={index} className={Styles.Option}>
                        <span className={Styles.OptionLabel}>
                            {String.fromCharCode(65 + index)}.
                        </span>
                        <span className={Styles.OptionText}>{option}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Question;
