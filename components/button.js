// components/Button.js
import styles from '../styles/button.module.css';

export default function Button({ className, children }) {
  return (
    <button className={`${styles.button} ${className || ''}`}>
      {children}
    </button>
  );
}
