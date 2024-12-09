import Styles from '../styles/dropDown.module.css';

const DropDown = () => {
    return(
        <div className={Styles.dropdown}>
        <button className={Styles.dropdownBtn}>
            <img src='/resources.svg'/>
          <span>Resources</span>
        </button>
        <ul className={Styles.dropdownList}>
          <li>Hints for Questions</li>
          <li>Topic Concepts</li>
          <li>Step by Step</li>
        </ul>
      </div>      
    )
}

export default DropDown


