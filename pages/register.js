"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/register.module.css";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const updateImageSrc = () => {
      const width = window.innerWidth;
      if (width >= 1025) {
        setImageSrc("banner.svg"); // Desktop
      } else if (width >= 601 && width <= 1024) {
        setImageSrc("/tab_banner.svg"); // Tablet
      } else {
        setImageSrc(""); // No image for mobile c
      }
    };
    updateImageSrc();
    window.addEventListener("resize", updateImageSrc);

    return () => {
      window.removeEventListener("resize", updateImageSrc);
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
  };
  return (
    <div className={styles.loginContainer}>
      <div className={styles.imageContainer}>
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Login illustration"
            className={styles.loginImage}
          />
        )}
        {/* <img
          src="banner.svg"
          alt="Login illustration"
          className={styles.loginImage}
        /> */}
      </div>

      <div className={styles.formContainer}>
        <img
          src="logo.svg"
          alt="Login illustration"
          className={styles.logoImage}
        />
        <div className={styles.fieldContainer}>
          <h1 className={styles.loginHeader}>Create new account</h1>
          <p className={styles.fieldLabel}>First Name</p>
          <input
            type="text"
            className={styles.fieldBox}
            placeholder="Enter first name"
          />
          <p className={styles.fieldLabel}>Last Name</p>
          <input
            type="text"
            className={styles.fieldBox}
            placeholder="Enter last name"
          />
          <p className={styles.fieldLabel}>Email address</p>
          <input
            type="text"
            className={styles.fieldBox}
            placeholder="name@gmail.com"
          />
          <p className={styles.fieldLabel}>Password</p>
          <input
            type="text"
            className={styles.fieldBox}
            placeholder="Enter password"
          />
          <div className={styles.termsAndCondition}>
            <input type="radio" />
            <p>
              I agree to the
              <span className={styles.forgotPassword}>
                Terms and Privacy Policy
              </span>
            </p>
          </div>
          <button className={styles.loginButton}>Register</button>
        </div>
        <p className={styles.prompt}>
          Already have an account?
          <span className={styles.create}> Log In</span>
        </p>
      </div>
    </div>
  );
}

