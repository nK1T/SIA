import React from "react";
import styles from "./rewardSection.module.scss";

const RewardSection = () => {
  return (
    <div className={styles.rContainer}>
      <div className={styles.wrapper}>
        <div className={styles.heading}>For Verified Users</div>
        <div className={styles.subHeading}>
          Get up to <span>500 rebate USDT</span> in rewards
        </div>
        <button>
          Sign Up Now
        </button>
      </div>
    </div>
  );
};

export default RewardSection;
