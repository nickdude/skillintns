import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styles from '../styles/subscribePageCard.module.css';
import PayPalCard from './paypalCard';


export default function SubscriptionCard({ price, description, benefits, color, title, onClick, subscription_id }) {

  const [refresh,setRefresh] = useState(false)

  const [isOpenPayment, setIsOpenPayment] = useState(false);
  const openPayment = () => setIsOpenPayment(true);
  const closePayment = () => setIsOpenPayment(false);
  const [showSubscribtionDetail , setShowSubscribtionDetail] = useState(false)
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [subscribtionDetail , setSubscribtionDetail] = useState(null)

  const limitedBenefits = benefits.slice(0, 3);
  const backgroundImage = color === 'green' ? '/subscribebg.svg' : '/subscribebgblack.svg';
   
  const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
  const corsProxyUrl = process.env.NEXT_PUBLIC_CORS_PROXY_URL;
  const apiUrl = corsProxyUrl ? `${corsProxyUrl}${baseApiUrl}` : baseApiUrl;
  
  
  const handleSubscription = async () => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      const student_id = localStorage.getItem("student_id");

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

  const details = async()=>{
    setShowSubscribtionDetail(true)
    setLoading(true);  // Set loading state to true
    setError(null);    // Clear any previous error

    // Get token and subscription_id from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
        setError("Missing token or subscription ID");
        setLoading(false);
        return;
    }

    try {
        // API call
        const response = await fetch(
            `${apiUrl}/get_subscription_details?subscription_id=${subscription_id}`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            }
        );

        // Check if the response is successful
        if (!response.ok) {
            throw new Error("Failed to fetch subscription details");
        }

        const data = await response.json();
        console.log(data,"<<<<<<<")
        setSubscribtionDetail(data);  // Update state with the fetched details

    } catch (err) {
      console.log(err)
        setError(err.message);  // Handle any errors
    } finally {
        setLoading(false);  // Set loading to false after request is done
    }

    
  }

  const closeDetail = () =>{
    setShowSubscribtionDetail(false)
  }
    console.log("<<<<<",subscribtionDetail)
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
                  <span className={styles.price}>${price}</span>
                  <span className={styles.perMonth}>/month</span>
                </div>
            </div>

            <div className={styles.buttonsContainer}>
            {color !== 'green' ? 
            <button className={styles.subscribeButton} onClick={openPayment}>Subscribe</button>
            :
            <button className={styles.subscribeButton} onClick={details}>Subscription Details</button>
            }
              <button className={styles.viewTasksButton}  onClick={onClick}>View Tasks</button>
            </div>
        </div>
        <PayPalCard isOpen={isOpenPayment} onClose={closePayment} price={price} subscription_id={subscription_id}/>
          {showSubscribtionDetail && <div className={styles.subscribtionDetailContainer}>
              <div className={styles.subscribtionDetailCard}>
                <div className={styles.topBar}>
                  <h1>Subscription Detail</h1>
                  <button className={styles.closeButton} aria-label="Close" onClick={closeDetail}>
                    ×
                  </button>
                </div>
               {loading && <p>Loading...</p>}
               {error && <p>{error}</p>} 
               {!loading && !error && showSubscribtionDetail && <div className={styles.subContainer}>
                  <div className={styles.subscribtionDetailDiv}>
                     <p className={styles.subscribtionDetailPara}>Status: {subscribtionDetail?.status}</p>
                     <p className={styles.subscribtionDetailPara}>Status Updated On: {subscribtionDetail?.status_update_time ? new Date(subscribtionDetail.status_update_time).toLocaleDateString("en-GB") : 'N/A'}</p>
                     <p className={styles.subscribtionDetailPara}>Subscription ID: {subscribtionDetail?.id}</p>
                     <p className={styles.subscribtionDetailPara}>Plan ID: {subscribtionDetail?.plan_id}</p> 
                  </div>
                  <div className={styles.subscribtionDetailDiv}>
                      <p className={styles.subscribtionDetailPara}>Start Time: {subscribtionDetail?.start_time ?  new Date(subscribtionDetail.start_time).toLocaleDateString("en-GB") : 'N/A'}</p>
                      <p className={styles.subscribtionDetailPara}>Email: {subscribtionDetail?.subscriber?.email_address}</p>
                      <p className={styles.subscribtionDetailPara}>Subscriber Name: {subscribtionDetail?.subscriber?.name?.given_name}</p>
                      <p className={styles.subscribtionDetailPara}>Next Billing Time:{subscribtionDetail?.billing_info?.next_billing_time ? new Date(subscribtionDetail.billing_info.next_billing_time).toLocaleDateString("en-GB") : 'N?A'}</p> 
                  </div>
                </div>}
                 
              </div>
          </div>}
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