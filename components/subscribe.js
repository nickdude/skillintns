import styles from '../styles/subscribe.module.css';

export default function SubscriptionPopup({ isOpen, onClose }) {
  if (!isOpen) return null; 

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        {/* Top Bar */}
        <div className={styles.topBar}>
          <h1>Subscribe</h1>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        {/* Subscription Content */}
        <div className={styles.subscriptionContent}>
          {/* Background Box */}
          <div className={styles.subscriptionBox}>
            <div className={styles.pricing}>
              <span className={styles.price}>$28</span>
              <span className={styles.perMonth}>/month</span>
            </div>
            <span className={styles.premium}>PREMIUM</span>
            <p className={styles.description}>
              Enjoy complete and uninterrupted access to all features on Skillintens.
            </p>

            {/* Benefits Section */}
            <div className={styles.benefitsContainer}>
              <h3 className={styles.allBenefits}>All Benefits</h3>
              <div className={styles.benefitsBox}>
                <table className={styles.benefitsTable}>
                  <tbody>
                    <tr>
                      <td><img src="/check.svg" alt="Check" className={styles.checkIcon} /></td>
                      <td>Access to exclusive content</td>
                    </tr>
                    <tr>
                      <td><img src="/check.svg" alt="Check" className={styles.checkIcon} /></td>
                      <td>Ad-free experience</td>
                    </tr>
                    <tr>
                      <td><img src="/check.svg" alt="Check" className={styles.checkIcon} /></td>
                      <td>Early access to new features</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className={styles.paymentMethods}>
            <p>Payment Methods</p>
            <button className={styles.paypalButton}>
              <img src="/paypal.svg" alt="PayPal" />
            </button>
            <button className={styles.cardButton}>
              <img src="/card-icon.svg" alt="Card" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
