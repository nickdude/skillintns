import { useState, useEffect } from "react";
import styles from "../styles/paypalCard.module.css";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation"; // For navigation



export default function PayPalCard({refreshPage,packageId, isOpen, onClose, subscription_id, price }) {
  
  const [message, setMessage] = useState(null);
  const router = useRouter(); // Initialize router

  const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
  const corsProxyUrl = process.env.NEXT_PUBLIC_CORS_PROXY_URL;
  const apiUrl = corsProxyUrl ? `${corsProxyUrl}${baseApiUrl}` : baseApiUrl;
  
  const initialOptions = {
    clientId: "AYiWbQ92P51XP6sFkS9he6cdy8OoSpGq_NeRPsB56dG1wqqi0Q8SHdAPSlUctqaHYB01dFLirOPLzqOi", 
    "enable-funding": "card",
    "disable-funding": "paylater",
    vault: "true",
    intent: "subscription",
  };

  const handlePaymentSuccess = async (subscriptionData) => {
    const token = localStorage.getItem('token')
    try {
      // Extract the subscription ID from PayPal's response
      const { subscriptionID } = subscriptionData;

      // Get the user_id from sessionStorage
      const userId = localStorage.getItem('email');

      // Ensure user_id exists in sessionStorage
      if (!userId) {
        setMessage('User ID is missing. Please log in again.');
        return;
      }

      // Set the subscription status to sessionStorage
      localStorage.setItem('subscriptionStatus', 'premium');
      localStorage.setItem('subscription_id', subscriptionID);

      // Prepare the data to send the subscription ID, status, and user_id to the API
      const subscriptionDetails = {
        subscription_id: subscriptionID,
        subscription_status: 'premium', 
        user_id: userId,
        package_id: packageId
      };

      // Call the API to update the user's subscription status using axios
      const response = await fetch(`${apiUrl}/update_user_subscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure the request is JSON
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(subscriptionDetails), // Convert data to JSON string
      });
      

      if (response.status === 200) {
        refreshPage()
        // Show success message and redirect after success
        setMessage('Subscription Successful! Redirecting...');
        setTimeout(() => {
          // router.push("/subscribePage");
          onClose()
        }, 1000);
      } else {
        setMessage('Failed to update subscription status.');
      }
    } catch (error) {
      console.error('Error updating subscription status:', error);
      setMessage('An error occurred while updating subscription.');
    }
  };

  if (!isOpen) return null;

  return (
  <div className={styles.overlay}>
    <div className={styles.popup}>
      <div className={styles.topBar}>
        <h1>Subscribe</h1>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>
      <div className={styles.detailContainer}>
          <div className={styles.subscriptionBox} 
              style={{ backgroundImage: `url('/subscribebgblack.svg')` ,
              height: "20.5rem"}}
              >
                <h1 className={styles.header}>Software Architecture Package</h1>
                <p className={styles.subHeader}>Practice for cloud certifications AWS, Azure, TOGAF  etc.</p>
                <p className={styles.benefitHeader}>All Benefits</p>
                <div className={styles.benefitContainer}>
                        xyz
                </div>
                <p className={styles.unit}><span className={styles.price}>$19.99</span>/month</p>
            </div>
            <p className={styles.paymentText}>Payment Methods</p>
            {message}
            {/* <div id="paypal-button-placeholder" className={styles.paypalButtons}></div> */}
            <PayPalScriptProvider options={initialOptions}>
                    <PayPalButtons
                      style={{
                        shape: "rect",
                        layout: "vertical",
                      }}
                      createSubscription={async (_, actions) => {
                        // Ensure actions.subscription is defined before using it
                        if (actions && actions.subscription) {
                          return await actions.subscription.create({
                            plan_id: 'P-6SD49150GW878284MM3NYAMQ', // Plan ID provided by you
                          });
                        }
                        return Promise.reject('Subscription creation failed');
                      }}
                      onApprove={async (_, actions) => {
                        // Ensure actions.subscription and actions.subscription.get are defined before using them
                        if (actions && actions.subscription && actions.subscription.get) {
                          const details = await actions.subscription.get();
                          const subscriptionData = {
                            subscriptionID: details.id, // Only use the subscription ID
                          };
                          handlePaymentSuccess(subscriptionData);
                        } else {
                          return Promise.reject('Subscription approval failed');
                        }
                      }}
                    />
                  </PayPalScriptProvider>
      </div>
    </div>
  </div>
  );
}