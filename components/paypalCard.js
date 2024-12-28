import { useState, useEffect } from "react";
import styles from "../styles/paypalCard.module.css";

export default function PayPalCard({ isOpen, onClose, subscription_id, price }) {
   
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [error, setError] = useState(null);

  const loadPayPalSDK = (clientId, retries = 3) => {
    return new Promise((resolve, reject) => {
      const tryLoad = (attemptsRemaining) => {
        if (attemptsRemaining === 0) {
          reject(new Error("PayPal SDK failed to load after multiple attempts"));
          return;
        }

        if (window.paypal) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => {
          console.log(`Failed to load PayPal SDK, attempts remaining: ${attemptsRemaining}`);
          setTimeout(() => tryLoad(attemptsRemaining - 1), 2000); // Retry after 2 seconds
        };
        document.body.appendChild(script);
      };

      tryLoad(retries);
    });
  };

  useEffect(() => {
    if (!isOpen || sdkLoaded) return;

    loadPayPalSDK("AYiWbQ92P51XP6sFkS9he6cdy8OoSpGq_NeRPsB56dG1wqqi0Q8SHdAPSlUctqaHYB01dFLirOPLzqOi") // Replace with your PayPal client ID
      .then(() => {
        setSdkLoaded(true);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        console.error("PayPal SDK loading error:", error.message);
      });
  }, [isOpen, sdkLoaded]);

  useEffect(() => {
    if (!sdkLoaded) return;

    // Only render PayPal buttons once
    if (window.paypal && !document.getElementById("paypal-button-placeholder").childElementCount) {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: price,
                  },
                },
              ],
            });
          },
          onApprove: (data, actions) => {
            console.log(actions.order.get(),"<<<<<<<<<<<<<<<<<<<<")
            handleSubscription()
            return actions.order.capture().then((details) => {
              alert(`Transaction completed by ${details.payer.name.given_name}`);
              onClose(); 
            });
          },
          onError: (err) => {
            console.error("PayPal error:", err);
            alert("Payment failed. Please try again.");
          },
        })
        .render("#paypal-button-placeholder");
    }
  }, [sdkLoaded]);

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
            <div id="paypal-button-placeholder" className={styles.paypalButtons}></div>
      </div>
    </div>
  </div>
  );
}