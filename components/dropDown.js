import React, { useState, useRef, useEffect } from "react";
import Styles from "../styles/dropDown.module.css";
import ConceptCard from "./conceptCard";
import HintCard from "./hintCard";
import StepByStep from "./stepByStep";

const DropDown = ({ question, id, skill_name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hintOpen, setHintOpen] = useState(false)
  const [conceptOpen,setConceptOpen] = useState(false)
  const [stepByStepOpen,setStepByStepOpen] = useState(false)
  const taskId = id; 
    
  const closeHintCard  = () =>{ 
    setHintOpen(false)
  };

  const closeConceptCard  = () =>{ 
    setConceptOpen(false)
  };

  const closeStepsCard  = () =>{ 
    setStepByStepOpen(false)
  };

  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen((prev) => !prev);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

 
  const handleHintToggle = () => {
    setHintOpen(!hintOpen)
    setIsOpen(false); 
  };
  const handleConceptToggle = () => {
    setConceptOpen(!conceptOpen)
    setIsOpen(false); 
  };
  const handleStepByStepToggle = () => {
    setStepByStepOpen(!stepByStepOpen)
    setIsOpen(false); 
  };

  return (
    <>
    <div className={Styles.dropdown} ref={dropdownRef}>
      <button
        className={Styles.dropdownBtn}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
      >
        <img src="/resources.svg" alt="Resources Icon" />
        <span>Resources</span>
      </button>
      {isOpen && (
        <ul className={Styles.dropdownList} role="menu">
          <li
            role="menuitem"
            tabIndex="0"
            onClick={() => handleHintToggle()}
          >
            Hints for Questions
          </li>
          <li
            role="menuitem"
            tabIndex="1"
            onClick={() => handleConceptToggle()}
          >
            Topic Concepts
          </li>
          <li
            role="menuitem"
            tabIndex="2"
            onClick={() => handleStepByStepToggle()}
          >
            Step by Step
          </li>
        </ul>
      )}
    </div>
    <HintCard isOpen={hintOpen} onClose={closeHintCard} taskId={taskId} question={question}/>
    <StepByStep isOpen={stepByStepOpen} onClose={closeStepsCard} taskId={taskId} question={question}/>
    <ConceptCard isOpen={conceptOpen} onClose={closeConceptCard} taskId={taskId} question={question} skill_name={skill_name}/>
    </>
  );
};

export default DropDown;
