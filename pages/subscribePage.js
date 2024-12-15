import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Styles from "/styles/subscribePage.module.css";
import SubscriptionCard from "../components/subscribePageCard";
import { useRouter } from "next/navigation"; 

export default function Package() {
  const router = useRouter(); 
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
  const corsProxyUrl = process.env.NEXT_PUBLIC_CORS_PROXY_URL;
  const apiUrl = corsProxyUrl ? `${corsProxyUrl}${baseApiUrl}` : baseApiUrl;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email"); 
    const fetchPackages = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/adaptive_user_packages?user_id=${email}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch packages");
        }

        const data = await response.json();
        setPackages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [apiUrl]);

  const handleCardClick = (id, package_name) => {
    router.push(`/landing/${id}?package_name=${package_name}`);
  };


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
              <p>Subscribe to the available packages to practice skills.</p>
            </div>
          </div>

          <div className={Styles.cardsContainer}>
            {loading && <p>Loading packages...</p>}
            {error && <p className={Styles.errorMessage}>{error}</p>}
            {!loading &&
              !error &&
              packages.map((pkg) => (
                <SubscriptionCard
                  key={pkg.adaptive_package_id}
                  price={pkg.subscription_status === "ACTIVE" ? "$28" : "$28"}
                  description="Enjoy complete and uninterrupted access to all features on Skillintens."
                  benefits={['For high school curriculum tasks', 'Ad- free experience', 'Early access to new features']}
                  color={pkg.subscription_status === "ACTIVE" ? "green" : "black"}
                  title={pkg.adaptive_package_name}
                  onClick={() => handleCardClick(pkg.adaptive_package_id,pkg.adaptive_package_name)}
                  subscription_id={pkg.subscription_id}
                />
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}