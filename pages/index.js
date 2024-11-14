// pages/index.js
import SubscribeNow from '../components/SubscribeButton'
import EnrollNow from '../components/EnrollNowButton.js'
import Cards from '../components/cardEnumerator.js'
import Navbar from '../components/navbar'
import Head from 'next/head';
import Styles from '/styles/index.module.css'
export default function Home() {
  return (
    
    <div>
      <script></script>
      <Navbar />
      <main>
        <div className={Styles.mainContent}>
            <div className={Styles.contentHead}>
                <div className={Styles.textContainer}>
                    <p><span className={Styles.boldText}>Enroll Tasks </span><span className={Styles.basicTextLarge}> -Practice. Progress. Succeed.</span></p>
                    <br />
                    <p className={Styles.basicTextSmall}>Step-by-Step <span className={Styles.basicTextSmallGreen}>Learning</span> to Build Confidence and Knowledge</p>
                </div>
                <div className={Styles.ButtonContainer}>
                    <SubscribeNow />
                </div>
            </div>
          <div className={Styles.cards}>

          <Cards
          Styles={Styles.card}
          image ="/image1.png"  // Path to the image for the card
          skillCount={9}  // Number of skills for this course
          isFree={true}  // Whether the course is free
          title="SAT MATHS Practice Test Practice"  // Title of the course
          publisher="SAT Maths"  // Publisher name
          />
          <Cards
          Styles={Styles.card}
          image ="/image1.png"  // Path to the image for the card
          skillCount={9}  // Number of skills for this course
          isFree={true}  // Whether the course is free
          title="SAT MATHS Practice Test Practice"  // Title of the course
          publisher="SAT Maths"  // Publisher name
          />
          <Cards
          Styles={Styles.card}
          image ="/image1.png"  // Path to the image for the card
          skillCount={9}  // Number of skills for this course
          isFree={true}  // Whether the course is free
          title="SAT MATHS Practice Test Practice"  // Title of the course
          publisher="SAT Maths"  // Publisher name
          />
          <Cards
          Styles={Styles.card}
          image ="/image1.png"  // Path to the image for the card
          skillCount={9}  // Number of skills for this course
          isFree={true}  // Whether the course is free
          title="SAT MATHS Practice Test Practice"  // Title of the course
          publisher="SAT Maths"  // Publisher name
          />
        </div>

        </div>
        
      </main>
    </div>
    
  )
}
