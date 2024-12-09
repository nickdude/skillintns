import PropTypes from 'prop-types';
import styles from '../styles/subscribePageCard.module.css';


export default function SubscriptionCard({ price, description, benefits, color, title, onClick }) {

  const limitedBenefits = benefits.slice(0, 3);


  const backgroundImage = color === 'green' ? '/subscribebg.svg' : '/subscribebgblack.svg';

  return (
    <div className={styles.subscriptionCard}>
     
      <div className={styles.subscriptionBox} style={{ backgroundImage: `url(${backgroundImage})` }}>
       
        <div className={styles.premium}>
          <p>{title}</p>
        </div>

        <div className={styles.contentWrapper}>
          <p className={styles.description}>{description}</p>
           <div className={styles.benefitsContainer}>
            <h3 className={styles.allBenefits}>All Benefits</h3>
            <div className={styles.benefitsBox}>
              <table className={styles.benefitsTable}>
                <tbody>
                  {limitedBenefits.map((benefit, index) => (
                    <tr key={index}>
                      <td className={styles.checkCell}>
                        <img src="/check.svg" alt="Check" className={styles.checkIcon} />
                      </td>
                      <td>{benefit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
           </div>
        </div>
        
          <div className={styles.pricing}>
            <span className={styles.price}>{price}</span>
            <span className={styles.perMonth}>/month</span>
          </div>
      </div>

      <div className={styles.buttonsContainer}>
        <button className={styles.subscribeButton}>Subscribe</button>
        <button className={styles.viewTasksButton}  onClick={onClick}>View Tasks</button>
      </div>
    </div>
  );
}

// Define Prop Types
SubscriptionCard.propTypes = {
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  benefits: PropTypes.arrayOf(PropTypes.string).isRequired,
  color: PropTypes.oneOf(['green', 'black']).isRequired,
  title: PropTypes.string.isRequired,  // Title for the golden text above the image
};