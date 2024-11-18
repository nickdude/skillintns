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
            >
              <td className={styles.iconCell}>
                <img src='/APlus.svg'></img>
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
