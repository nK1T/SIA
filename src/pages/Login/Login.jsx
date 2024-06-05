import React, { useEffect, useState } from "react";
import styles from "./login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { GoNumber } from "react-icons/go";

const Login = ({setAuthenticated}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState();
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isOtpSent, setIsOtpSent] = useState(false);

  useEffect(() => {
    document.title = "Login - SIA";
    window.scrollTo(0, 0);
  }, []);

  // Check if the user is already authenticated
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  // If the user is authenticated, redirect to the dashboard
  useEffect(() => {
    if (isAuthenticated) {
      // You can use the `navigate` function from your routing library
      // to navigate to the dashboard
      navigate("/home");
    }
  }, [isAuthenticated]);

  const handleCheckEmail = async (e) => {
    e.preventDefault();

    try {
      // Check if the email is registered
      const response = await axios.post(
        "https://startupinvestorai.in/backend/login/check-email.php",
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
        );

      if (response.data.success) {
        // Email is registered, proceed to generate OTP
        setIsOtpSent(true);

        // Generate and send OTP
        const generateOTPResponse = await axios.post(
          "https://startupinvestorai.in/backend/login/login-otp-generation.php",
          {
            email,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        if (generateOTPResponse.data.success) {
          // OTP sent successfully
          // alert(
          //   "OTP has been sent to your email. Please enter the OTP to login."
          // );
        } else {
          // Failed to send OTP
          alert("Failed to send OTP. Please try again.");
        }
      } else {
        // Email is not registered
        setErrorMsg(response.data.message);
        setIsEmailValid(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Verify OTP
      setLoading(true);
      const verifyOTPResponse = await axios.post(
        "https://startupinvestorai.in/backend/login/verify-login-otp.php",
        {
          email,
          otp,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (verifyOTPResponse.data.success) {
        // Perform additional login actions, such as setting session variables
        setAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("email", email);
        localStorage.setItem("username", verifyOTPResponse.data.userData.username);
        localStorage.setItem("createdAt", verifyOTPResponse.data.userData.createdAt);
        setEmail("");
        setOtp("");
        setIsEmailValid(true);
        setIsOtpSent(false);
        navigate("/home");
      } else {
        // OTP verification failed
        alert("Login failed. Please check your email and OTP.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.top}>
            <p>Welcome back!</p>
          </div>
          {!isOtpSent ? (
            <form onSubmit={handleCheckEmail}>
              <div className={styles.formField}>
                <label className={styles.inputLabel}><FaUser size={12}/>Email
                    </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={styles.inputField}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
              {!isEmailValid && (
                <p style={{ color: "crimson", fontSize:".7rem", marginTop:"5px" }}>
                  {errorMsg}
                </p>
              )}
              </div>
              <button type="submit" className={styles.btn}>
                Send OTP
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin}>
              <div className={styles.formField}>
                <label className={styles.inputLabel}>OTP</label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={otp}
                  minLength="6"
                  maxLength="6"
                  className={styles.inputField}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className={styles.btn}>
                Login
                {loading && <ClipLoader size={12} />}
              </button>
            </form>
          )}
          <div className={styles.register}>
          <p>
            Don't Have account?
            <Link
              to="/register"
              style={{
                textDecoration: "underline",
                fontWeight: "700",
              }}
            >
              {" "}
              Create Account
            </Link>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
