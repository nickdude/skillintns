import PropTypes from 'prop-types';
import styles from '../styles/subscribePageCard.module.css';

/**
 * SubscriptionCard Component
 * 
 * This component renders a subscription card with a dynamic structure.
 *
 * @param {Object} props
 * @param {string} props.price - The price for the subscription.
 * @param {string} props.description - The description of the subscription.
 * @param {Array} props.benefits - An array of strings, each representing a benefit of the subscription (maximum 3).
 * @param {string} props.color - The color of the card background, either 'green' or 'black'.
 * @param {string} props.title - The title or golden text above the image (e.g., "Enjoy our premium subscription today!").
 */
export default function SubscriptionCard({ price, description, benefits, color, title }) {
  // Ensure there are no more than 3 benefits
  const limitedBenefits = benefits.slice(0, 3);

  // Set background image dynamically based on the 'color' prop
  const backgroundImage = color === 'green' ? '/subscribebg.svg' : '/subscribebgblack.svg';

  return (
    <div className={styles.subscriptionCard}>
      {/* Background and Content */}
      <div className={styles.subscriptionBox} style={{ backgroundImage: `url(${backgroundImage})` }}>
        {/* Golden Text above the image */}
        <div className={styles.premium}>
          <p>{title}</p>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.pricing}>
            <span className={styles.price}>{price}</span>
            <span className={styles.perMonth}>/month</span>
          </div>
          <p className={styles.description}>{description}</p>

          {/* Benefits Section */}
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
      </div>

      {/* Buttons Section */}
      <div className={styles.buttonsContainer}>
        <button className={styles.subscribeButton}>Subscribe</button>
        <button className={styles.viewTasksButton}>View Tasks</button>
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