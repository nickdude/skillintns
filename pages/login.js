"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/login.module.css";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const updateImageSrc = () => {
      const width = window.innerWidth;
      if (width >= 1025) {
        setImageSrc("/banner.svg"); // Desktop
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
          //src="banner.svg"
          src="tab_banner.svg"
          alt="Login illustration"
          className={styles.loginImage}
        /> */}
      </div>

      <div className={styles.formContainer}>
        <img
          src="/logo.png"
          alt="Login illustration"
          className={styles.logoImage}
        />
        <div className={styles.fieldContainer}>
          <h1 className={styles.loginHeader}>Login to your account</h1>
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
          <p className={styles.forgotPassword}>Forgot Password ?</p>
          <button className={styles.loginButton}>Login</button>
        </div>
        <p className={styles.prompt}>
          Are you a new User?
          <span className={styles.create}> Create an account</span>
        </p>
      </div>
    </div>
  );
}
