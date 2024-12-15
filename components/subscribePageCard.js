import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styles from '../styles/subscribePageCard.module.css';
// import PayPalCard from './paypalCard';


export default function SubscriptionCard({ price, description, benefits, color, title, onClick, subscription_id }) {

  const limitedBenefits = benefits.slice(0, 3);
  const backgroundImage = color === 'green' ? '/subscribebg.svg' : '/subscribebgblack.svg';
   
  const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
  const corsProxyUrl = process.env.NEXT_PUBLIC_CORS_PROXY_URL;
  const apiUrl = corsProxyUrl ? `${corsProxyUrl}${baseApiUrl}` : baseApiUrl;
  const [refresh,setRefresh] = useState(false)
  
 
  const handleSubscription = async () => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      const student_id = localStorage.getItem("email");

      const response = await fetch(`${apiUrl}/update_user_subscription`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription_id: subscription_id,
          subscription_status: 'ACTIVE',
          user_id: student_id
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setRefresh(!refresh)
        console.log('Subscription updated successfully!');
      } else {
        console.error('Subscription update failed:', data);
      }
    } catch (error) {
      console.error('Error while updating subscription:', error);
    }
  };


  return (<>
        <div className={color === "green" ? styles.subscriptionCardPurchased : styles.subscriptionCard}>
            {color == 'green' &&
              <div className={styles.isSubscription}>
                <img src='../subscription.svg'/>
                <p>SUBSCRIBED</p>
              </div>}
            <div className={styles.subscriptionBox} 
                style={{ backgroundImage: `url(${backgroundImage})` ,
                height: color === "green" ? "24.5rem" : undefined,}}
                >
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
            {color !== 'green' && <button className={styles.subscribeButton} onClick={handleSubscription}>Subscribe</button>}
              <button className={styles.viewTasksButton}  onClick={onClick}>View Tasks</button>
            </div>
        </div>
        {/* <PayPalCard isOpen={true} onClose={true} taskId  id  question /> */}
    </>
   
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