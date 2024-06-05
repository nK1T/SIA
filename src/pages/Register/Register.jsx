import React, { useEffect, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import styles from "./register.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import {
  FaCalendar,
  FaGlobe,
  FaToolbox,
  FaUser,
  FaUserNinja,
} from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoGiftSharp } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isOtpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selected, setSelected] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    secretCode: "",
    referralCode: "",
    dob: "",
    gender: "",
    expLevel: "",
    usePreference: "",
  });
    const notifyFail = () =>
    toast.error("OTP verification failed.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check if the field is "referralCode", then convert to uppercase
    // Otherwise, update the state normally
    if (name === 'referralCode') {
      setFormData(prevState => ({
        ...prevState,
        [name]: value.toUpperCase()
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };
  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      dob: date,
    }));
  };
  const rqstData = {
    ...formData,
    otp: otp,
    country: selected,
  };
  useEffect(() => {
    document.title = "Create Account - SIA";
    window.scrollTo(0, 0);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Make an AJAX request to the PHP script
      const response = await axios.post(
        "https://startupinvestorai.in/backend/register/register.php",
        {
          email: formData.email,
          secretCode: formData.secretCode,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.data.success) {
        // OTP sent successfully
        setOtpSent(true);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Verify OTP on the server
    const verifyResponse = await axios.post(
      "https://startupinvestorai.in/backend/register/verify-register-otp.php",
      rqstData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (verifyResponse.data.success) {
      // OTP verification successful
      setLoading(false);
      // Redirect or perform additional actions as needed
      alert('Registration Successful')
      navigate("/login");
    } else {
      setLoading(false);
      // OTP verification failed
      notifyFail();
    }
  };
  return (
    <div className={styles.container}>
          <ToastContainer position="top-right" />
      <div className={styles.wrapper}>
        <div className={styles.top}>
          {/* <h2>
            <img src="/logo2.png" />
            IA
          </h2> */}
          <p>Welcome to SIA</p>
        </div>
        {!isOtpSent ? (
          <>
          <form className={styles.form}>
            <div className={styles.formField}>
              <label className={styles.inputLabel}>
                <FaUser size={12} />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.inputField}
                required
              />
              {errorMessage && (
                <div style={{ color: "crimson" }} className={styles.error}>
                  {errorMessage}
                </div>
              )}
            </div>
            <div className={styles.formField}>
              <label className={styles.inputLabel}>
                <RiLockPasswordFill />
                Password
              </label>
              <input
                type="text"
                name="secretCode"
                value={formData.secretCode}
                onChange={handleChange}
                className={styles.inputField}
                required
              />
            </div>
            <div className={styles.formField}>
              <label className={styles.inputLabel}>
                <FaCalendar size={12} />
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                onChange={(e) => handleDateChange(e.target.value)}
                className={styles.inputField}
                required
              />
            </div>
            <div className={styles.formField}>
              <label className={styles.inputLabel}>
                <FaUserGroup size={13} />
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={styles.inputField}
                required
              >
                <option value="" disabled selected>
                  --Select Gender--
                </option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </div>
            <div className={styles.formField}>
              <label className={styles.inputLabel}>
                <FaGlobe size={13} />
                Country
              </label>
              <ReactFlagsSelect
                selected={selected}
                onSelect={(code) => setSelected(code)}
                searchable
              />
              ;
            </div>
            <div className={styles.formField}>
              <label className={styles.inputLabel}>
                <FaUserNinja size={13} />
                I'm a
              </label>
              <select
                name="expLevel"
                value={formData.expLevel}
                onChange={handleChange}
                className={styles.inputField}
                required
              >
                <option value="" disabled selected>
                  --Select--
                </option>
                <option value="BEGINNER">Beginner</option>
                <option value="EXPERIENCED">Experienced</option>
                <option value="PROFESSIONAL">Professional</option>
              </select>
            </div>
            <div className={styles.formField}>
              <label className={styles.inputLabel}>
                <FaToolbox size={13} />I want to use
              </label>
              <select
                name="usePreference"
                value={formData.usePreference}
                onChange={handleChange}
                className={styles.inputField}
                required
              >
                <option value="" disabled selected>
                  --Select--
                </option>
                <option value="LITE">LITE</option>
                <option value="PRO">PRO</option>
              </select>
            </div>
            <div className={styles.formField}>
              <label className={styles.inputLabel}>
                <IoGiftSharp />
                Referral Code
              </label>
              <input
                type="text"
                name="referralCode"
                value={formData.referralCode}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>
          </form>
            <p>
              By creating an account, I agree to SIA's{" "}
              <Link>Terms of Service</Link> and <Link>Privacy Policy.</Link>
            </p>
            <button type="submit" onClick={handleSubmit} className={styles.btn}>
              Send OTP
              {loading && <ClipLoader size={12} />}
            </button>
            </>
        ) : (
          <form onSubmit={handleLogin} className={styles.form}>
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
              Register
              {loading && <ClipLoader size={12} />}
            </button>
          </form>
        )}
        <div className={styles.login}>
          <p>
            Have an account?
            <Link
              to="/"
              style={{
                textDecoration: "underline",
                fontWeight: "700",
              }}
            >
              {" "}
              Login now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
