"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/login.module.css";
import { useRouter } from "next/navigation"; // For navigation

export default function LoginPage() {
  const router = useRouter(); // Initialize router
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const updateImageSrc = () => {
      const width = window.innerWidth;
      if (width >= 1025) {
        setImageSrc("/banner.svg");
      } else if (width >= 601 && width <= 1024) {
        setImageSrc("/tab_banner.svg");
      } else {
        setImageSrc("");
      }
    };
    updateImageSrc();
    window.addEventListener("resize", updateImageSrc);

    return () => {
      window.removeEventListener("resize", updateImageSrc);
    };
  }, []);

  const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
  const corsProxyUrl = process.env.NEXT_PUBLIC_CORS_PROXY_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const apiUrl = corsProxyUrl ? corsProxyUrl + baseApiUrl : baseApiUrl;

      const response = await axios.post(
        `${apiUrl}/authenticate_user`,
        {
          user_id: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.match) {
        localStorage.setItem("token", response.data.token);
        router.push("/landing");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className={styles.fieldLabel}>Password</p>
          <input
            type="password"
            className={styles.fieldBox}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className={styles.forgotPassword}>Forgot Password ?</p>
          <button
            className={styles.loginButton}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <p className={styles.prompt}>
          Are you a new User?
          <span className={styles.create}> Create an account</span>
        </p>
      </div>
    </div>
  );
}
