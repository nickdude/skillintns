
import Cards from '../components/cards'
import Navbar from '../components/navbar'
import Button from '../components/button'
import Styles from '/styles/index.module.css'

export default function Package() {
  return (
    
    <div>
      <script></script>
      <Navbar />
      <main>
        <div className="mainContent">
            <div className={Styles.contentHead}>
                <div className={Styles.textContainer}>
                    <p><span className={Styles.boldText}>Available Packages </span><br/><span className={Styles.basicTextLarge}>Subscribe to the available packages to practice skills.</span></p>
                    <br />
                    <p className={Styles.basicTextSmall}>Step-by-Step <span className={Styles.basicTextSmallGreen}>Learning</span> to Build Confidence and Knowledge</p>
                </div>
                <div className={Styles.ButtonContainer}>
                <button className={Styles.button}>
                  Subscribe Now
                </button>
                </div>
            </div>
        <div className={Styles.cards}>
          
        </div>
        </div>
        
      </main>
    </div>
    
  )
}
