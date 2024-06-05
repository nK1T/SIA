import React, { useEffect, useState } from "react";
import styles from "./countdownTimer.module.scss";
import { IoIosClose } from "react-icons/io";
import { motion } from "framer-motion";

const CountdownTimer = ({ targetDate, onClose }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <>
      <div
        className={styles.cont}
      >
        <motion.div  initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }} className={styles.wrapper}>
          <h1>Upcoming Features</h1>
          <div className={styles.cards}>
            <div className={`${styles.card} ${styles.days}`}>
              <div className={styles["flip-card"]}>
                <div
                  className={`${styles["top-half"]} ${
                    timeLeft.days < 10 ? styles["flip"] : ""
                  }`}
                >
                  {timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}
                </div>
                <div
                  className={`${styles["bottom-half"]} ${
                    timeLeft.days < 10 ? styles["flip"] : ""
                  }`}
                >
                  {timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}
                </div>
              </div>
              <p>Days</p>
            </div>

            <div className={`${styles.card} ${styles.hours}`}>
              <div className={styles["flip-card"]}>
                <div
                  className={`${styles["top-half"]} ${
                    timeLeft.hours < 10 ? styles["flip"] : ""
                  }`}
                >
                  {timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}
                </div>
                <div
                  className={`${styles["bottom-half"]} ${
                    timeLeft.hours < 10 ? styles["flip"] : ""
                  }`}
                >
                  {timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}
                </div>
              </div>
              <p>Hours</p>
            </div>

            <div className={`${styles.card} ${styles.minutes}`}>
              <div className={styles["flip-card"]}>
                <div
                  className={`${styles["top-half"]} ${
                    timeLeft.minutes < 10 ? styles["flip"] : ""
                  }`}
                >
                  {timeLeft.minutes < 10
                    ? `0${timeLeft.minutes}`
                    : timeLeft.minutes}
                </div>
                <div
                  className={`${styles["bottom-half"]} ${
                    timeLeft.minutes < 10 ? styles["flip"] : ""
                  }`}
                >
                  {timeLeft.minutes < 10
                    ? `0${timeLeft.minutes}`
                    : timeLeft.minutes}
                </div>
              </div>
              <p>Minutes</p>
            </div>

            <div className={`${styles.card} ${styles.seconds}`}>
              <div className={styles["flip-card"]}>
                <div
                  className={`${styles["top-half"]} ${
                    timeLeft.seconds < 10 ? styles["flip"] : ""
                  }`}
                >
                  {timeLeft.seconds < 10
                    ? `0${timeLeft.seconds}`
                    : timeLeft.seconds}
                </div>
                <div
                  className={`${styles["bottom-half"]} ${
                    timeLeft.seconds < 10 ? styles["flip"] : ""
                  }`}
                >
                  {timeLeft.seconds < 10
                    ? `0${timeLeft.seconds}`
                    : timeLeft.seconds}
                </div>
              </div>
              <p>Seconds</p>
            </div>
          </div>
          <div className={styles.btn}>
            <a href="/STARTUP investor AI.pdf" download="STARTUP investor AI">
              Our roadmap
            </a>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default CountdownTimer;
