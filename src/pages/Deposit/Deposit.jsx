import React, { useEffect, useState } from "react";
import styles from "./deposit.module.scss";
import {
  TbHexagonNumber1,
  TbHexagonNumber2,
  TbHexagonNumber3,
  TbHexagonNumber4,
  TbHexagonNumber5,
  TbHexagonNumber6,
} from "react-icons/tb";
import axios from "axios";
import { FaCopy, FaDollarSign } from "react-icons/fa";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { usePopup } from "../../components/PopupProvider";

const Deposit = () => {
  const [selectedNetwork, setSelectedNetwork] = useState(false);
  const { setShowSuccessPopup } = usePopup();
  const address = "TRN4wcM3WjYjof8dFUqyH9etWsabXjoVT7";
  const [isOtpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    coin: "",
    network: "",
    depositAmount: "",
    transactionId: "",
    transactionScreenshot: null, // Initialize with null for file type
  });

  const rqstData = {
    ...formData,
    email: email,
    address: address,
    otp: otp,
  };

  useEffect(() => {
    document.title = "Deposit";
    window.scrollTo(0, 0);
    const lemail = localStorage.getItem("email");
    setEmail(lemail);
  }, []);

  const notify = () =>
    toast("Copied to Clipboard ✔️", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const notifyOtp = () =>
    toast.success("OTP Sent", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const notifyTxnId = () =>
    toast.error("Transaction ID already exists", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the field is depositAmount
    if (name === "depositAmount") {
      // Regular expression to match numbers (both integers and decimals)
      const regex = /^\d*\.?\d*$/;

      // If the input doesn't match, replace it with the previous valid value (without the non-digit characters)
      if (!regex.test(value)) {
        // If the input doesn't match, replace it with the previous valid value (without the non-digit characters)
        e.target.value = value.replace(/[^\d.]/g, "");
      }
    }

    // Update the form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0], // Assign the selected file
    }));
  };

  const handleOtp = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    const {
      coin,
      network,
      depositAmount,
      transactionId,
      transactionScreenshot,
    } = formData;
    if (
      !coin ||
      !network ||
      !depositAmount ||
      !transactionId ||
      !transactionScreenshot
    ) {
      alert("Please fill in all the fields before sending OTP.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://startupinvestorai.in/backend/deposit/deposit.php",
        {
          email: email,
          transactionId: transactionId,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.data.success) {
        // OTP sent successfully
        notifyOtp();
        setOtpSent(true);
      } else if (response.data.message == "Transaction ID already exists") {
        notifyTxnId();
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Make a POST request to verify OTP
      const response = await axios.post(
        "https://startupinvestorai.in/backend/deposit/deposit-verification.php",
        rqstData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setLoading(false);
        // Deposit successful, show the Popup
        setShowSuccessPopup(true);
        //After successful deposit show the form from beginning
        setOtpSent(false);
        navigate("/myassets");
      } else {
        setLoading(false);
        alert("OTP verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" />
      <div className={styles.wrapper}>
        <div className={styles.left}>
          {!isOtpSent ? (
            <form onSubmit={handleOtp}>
              <div className={styles.form}>
                <div className={styles.field}>
                  <p>
                    <TbHexagonNumber1 color="#892cdc" />
                    Select Coin
                  </p>
                  <select
                    name="coin"
                    className={styles.customSelect}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled selected>
                      --Select Coin--
                    </option>
                    <option value="USDT (TetherUS)">USDT (TetherUS)</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <p>
                    <TbHexagonNumber2 color="#892cdc" />
                    Select Network
                  </p>
                  <select
                    name="network"
                    className={styles.customSelect}
                    onChange={(e) => {
                      setSelectedNetwork(true);
                      handleInputChange(e);
                    }}
                    required
                  >
                    <option value="" disabled selected>
                      --Select Network--
                    </option>
                    <option value="TRX Tron (TRC20)">TRX Tron (TRC20)</option>
                  </select>
                </div>
                {!selectedNetwork ? (
                  <div className={styles.field}>
                    <p style={{ color: "hsl(236, 21%, 26%)" }}>
                      <TbHexagonNumber3 color="#8a2cdc3e" />
                      Deposit address
                    </p>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    <div className={styles.field}>
                      <p>
                        <TbHexagonNumber3 color="#892cdc" />
                        Deposit Address
                      </p>
                      <div className={styles.address}>
                        <div className={styles.qr}>
                          <img src="/addressqr.jpg" width={80} />
                        </div>
                        <div className={styles.qrtext}>
                          <p>Address</p>
                          <p>
                            {address}
                            <FaCopy
                              color="#892cdc"
                              size={15}
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                navigator.clipboard.writeText(address),
                                  notify();
                              }}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className={styles.field}>
                      <p>
                        <TbHexagonNumber4 color="#892cdc" />
                        Deposit USDT
                      </p>
                      <div className={styles.dollar}>
                        <input
                          name="depositAmount"
                          type="text"
                          minLength={2}
                          placeholder="Min value 10"
                          className={styles.typeField}
                          onChange={handleInputChange}
                          required
                        />
                        <button>
                          <FaDollarSign />
                        </button>
                      </div>
                    </div>
                    <div className={styles.field}>
                      <p>
                        <TbHexagonNumber5 color="#892cdc" />
                        Transaction ID
                      </p>
                      <input
                        name="transactionId"
                        type="text"
                        className={styles.typeField}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className={styles.field}>
                      <p>
                        <TbHexagonNumber6 color="#892cdc" />
                        Transaction Screenshot
                      </p>
                      <input
                        name="transactionScreenshot"
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        className={styles.typeField}
                        onChange={handleFileChange}
                        required
                      />
                    </div>
                    <button type="submit" className={styles.btn}>
                      Get OTP{loading && <ClipLoader size={13} />}
                    </button>
                  </motion.div>
                )}
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.field}>
                <p>OTP</p>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={otp}
                  minLength="6"
                  maxLength="6"
                  className={styles.typeField}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6 Digit OTP"
                  required
                />
              </div>
              <button type="submit" className={styles.btn}>
                Deposit
                {loading && <ClipLoader size={12} />}
              </button>
            </form>
          )}
        </div>
        <div className={styles.right}>
          <h3>FAQ</h3>
          <div className={styles.video}>
            <img src="/video.png" />
            <div className={styles.videoTitle}>
              <p>How to deposit crypto?</p>
              <p>4:10</p>
            </div>
          </div>
          <div className={styles.qstns}>
            <p>How to Deposit Crypto Step-by-step Guide</p>
            <p>Deposit hasn't arrived?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
