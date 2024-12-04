import styles from '../styles/taskTable.module.css';

export default function SubjectList({ data }) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={`${styles.row} ${
                item.selected ? styles.selected : ''
              }`}
              onClick={item.onClick} // Attach the onClick handler here
              style={{ cursor: 'pointer' }} // Optional: Add cursor pointer for better UX
            >
              <td className={styles.iconCell}>
                <img src='/APlus.svg' alt='Icon' />
              </td>
              <td className={styles.subjectCell}>
                <span className={styles.subject}>{item.subject}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
