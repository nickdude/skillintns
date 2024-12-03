import Navbar from '../components/navbar';
import Styles from '/styles/subscribePage.module.css';
import SubscriptionCard from '../components/subscribePageCard'; // Import the SubscriptionCard component

export default function Package() {
  return (
    <div>
      <Navbar />
      <main>
        <div className="mainContent">
          <div className={Styles.textContainer}>
            <div className={Styles.boldText}>
              <p>Available Packages</p>
            </div>
            <div className={Styles.basicTextSmall}>
              <p>Subscribe to available Packages below.</p>
            </div>
          </div>

          {/* Render two SubscriptionCards with different props */}
          <div className={Styles.cardsContainer}>
              <SubscriptionCard
              price="$28"
              description="Enjoy complete and uninterrupted access to all features on Skillintens."
              benefits={['Benefit 1', 'Benefit 2', 'Benefit 3']}
              color="green"
              title="High School Package"
              />
              <SubscriptionCard
                price="$28"
                description="Enjoy complete and uninterrupted access to all features on Skillintens."
                benefits={['Benefit 1', 'Benefit 2', 'Benefit 3']}
                color="black"
                title="Architecture Package"
              />

          </div>
        </div>
      </main>
    </div>
  );
}
