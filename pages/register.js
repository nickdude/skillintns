"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import axios from "axios";
import styles from "../styles/register.module.css";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [visible,setVisible] = useState(false)

  const router = useRouter(); // Initialize the useRouter hook

  useEffect(() => {
    const updateImageSrc = () => {
      const width = window.innerWidth;
      if (width >= 1025) {
        setImageSrc("banner.svg"); // Desktop
      } else if (width >= 601 && width <= 1024) {
        setImageSrc("/tab_banner.svg"); // Tablet
      } else {
        setImageSrc(""); // No image for mobile
      }
    };
    updateImageSrc();
    window.addEventListener("resize", updateImageSrc);

    return () => {
      window.removeEventListener("resize", updateImageSrc);
    };
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!agree) {
      setError("You must agree to the Terms and Privacy Policy.");
      setLoading(false);
      return;
    }

    try {
      // Build the API URL
      const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
      const corsProxyUrl = process.env.NEXT_PUBLIC_CORS_PROXY_URL;
      const apiUrl = corsProxyUrl ? `${corsProxyUrl}${baseApiUrl}` : baseApiUrl;

      // API request
      const response = await axios.post(
        `${apiUrl}/register`,
        {
          user_id: email,
          first_name: firstName,
          last_name: lastName,
          password: password,
          role: "user",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Registration successful:", response.data);
      router.push("/"); // Navigate to the home page on success
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleEye = ()=>{
    setVisible(!visible)
  }

  const redirectToLoginPage = (taskId) => {
    router.push(`/`);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.imageContainer}>
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Register illustration"
            className={styles.loginImage}
          />
        )}
      </div>

      <div className={styles.formContainer}>
        <img
          src="logo.svg"
          alt="Register illustration"
          className={styles.logoImage}
        />
        <div className={styles.fieldContainer}>
          <h1 className={styles.loginHeader}>Create New Account</h1>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <p className={styles.fieldLabel}>First Name</p>
            <div  className={styles.fieldBox}>
              <input
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>       
          <p className={styles.fieldLabel}>Last Name</p>
            <div className={styles.fieldBox}>
              <input
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          <p className={styles.fieldLabel}>Email Address</p>
            <div className={styles.fieldBox}>
                <span
                  className="material-symbols-outlined"
                  style={{ color: "#9AA5B6","padding":"10px"}}
                >
                mail
              </span>
                <input
                type="email"
                placeholder="name@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
           
          <p className={styles.fieldLabel}>Password</p>
            <div className={styles.fieldBox}>
              <span 
                className="material-symbols-outlined"
                style={{ color: "#9AA5B6","padding":"10px"}}
                >
                lock
              </span>
              <input
                type={visible?"text":"password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {visible ?
                <span 
                  className="material-symbols-outlined"
                  style={{ color: "#9AA5B6","padding":"10px"}}
                  onClick={toggleEye}
                  >
                  visibility
                </span>
                :
                <span 
                  className="material-symbols-outlined"
                  style={{ color: "#9AA5B6","padding":"10px"}}
                  onClick={toggleEye}
                  >
                  visibility_off
                </span>}
            </div>
            {/* <input
              type="password"
              className={styles.fieldBox}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /> */}
          <div className={styles.termsAndCondition}>
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <p>
              I agree to the
              <span className={styles.forgotPassword}>
                Terms and Privacy Policy
              </span>
            </p>
          </div>
          <button
            className={styles.loginButton}
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
        <p className={styles.prompt}>
          Already have an account?
          <span className={styles.create} onClick={redirectToLoginPage}> Log In</span>
        </p>
      </div>
    </div>
  );
}


// "use client";
// import React, { useState, useEffect } from "react";
// import styles from "../styles/register.module.css";

// export default function RegisterPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [imageSrc, setImageSrc] = useState("");

//   useEffect(() => {
//     const updateImageSrc = () => {
//       const width = window.innerWidth;
//       if (width >= 1025) {
//         setImageSrc("banner.svg"); // Desktop
//       } else if (width >= 601 && width <= 1024) {
//         setImageSrc("/tab_banner.svg"); // Tablet
//       } else {
//         setImageSrc(""); // No image for mobile c
//       }
//     };
//     updateImageSrc();
//     window.addEventListener("resize", updateImageSrc);

//     return () => {
//       window.removeEventListener("resize", updateImageSrc);
//     };
//   }, []);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     console.log("Logging in with:", { email, password });
//   };
//   return (
//     <div className={styles.loginContainer}>
//       <div className={styles.imageContainer}>
//         {imageSrc && (
//           <img
//             src={imageSrc}
//             alt="Login illustration"
//             className={styles.loginImage}
//           />
//         )}
//       </div>

//       <div className={styles.formContainer}>
//         <img
//           src="logo.svg"
//           alt="Login illustration"
//           className={styles.logoImage}
//         />
//         <div className={styles.fieldContainer}>
//           <h1 className={styles.loginHeader}>Create new account</h1>
//           <p className={styles.fieldLabel}>First Name</p>
//           <input
//             type="text"
//             className={styles.fieldBox}
//             placeholder="Enter first name"
//           />
//           <p className={styles.fieldLabel}>Last Name</p>
//           <input
//             type="text"
//             className={styles.fieldBox}
//             placeholder="Enter last name"
//           />
//           <p className={styles.fieldLabel}>Email address</p>
//           <input
//             type="text"
//             className={styles.fieldBox}
//             placeholder="name@gmail.com"
//           />
//           <p className={styles.fieldLabel}>Password</p>
//           <input
//             type="text"
//             className={styles.fieldBox}
//             placeholder="Enter password"
//           />
//           <div className={styles.termsAndCondition}>
//             <input type="radio" />
//             <p>
//               I agree to the
//               <span className={styles.forgotPassword}>
//                 Terms and Privacy Policy
//               </span>
//             </p>
//           </div>
//           <button className={styles.loginButton}>Register</button>
//         </div>
//         <p className={styles.prompt}>
//           Already have an account?
//           <span className={styles.create}> Log In</span>
//         </p>
//       </div>
//     </div>
//   );
// }

