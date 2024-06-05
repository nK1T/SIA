import React, { useState } from "react";
import styles from "./faqSection.module.scss";
import { FaMinus, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
const FaqSection = () => {
  const faqData = [
    {
      question: "What is a cryptocurrency exchange?",
      answer:
        "Cryptocurrency exchanges are digital marketplaces that enable users to buy and sell cryptocurrencies like Bitcoin, Ethereum, and Tether. The SIA exchange is the largest crypto exchange by trade volume.",
    },
    {
      question: "How to buy Bitcoin and other cryptocurrencies on SIA",
      answer:
        "There are several ways to buy cryptocurrencies on SIA. You can use a credit/debit card, cash balance, or Apple Pay/Google Pay to purchase crypto on SIA. Before getting started, please make sure you’ve completed Identity Verification for your SIA account.",
    },
    {
      question: "How to track cryptocurrency prices",
      answer:
        "The easiest way to track the latest cryptocurrency prices, trading volumes, trending altcoins, and market cap is the SIA Cryptocurrency Directory. Click on the coins to know historical coin prices, 24-hour trading volume, and the price of cryptocurrencies like Bitcoin, Ethereum, BNB and others in real-time.",
    },
    {
      question: "How to trade cryptocurrencies on SIA",
      answer:
        "You can trade hundreds of cryptocurrencies on SIA via the Spot, Margin, Futures, and Options markets. To begin trading, users need to register an account, complete identity verification, buy/deposit crypto, and start trading.",
    },
    {
      question: "How to earn from crypto on SIA",
      answer:
        "Users can earn rewards on more than 180+ cryptocurrencies by using one of the products offered on SIA Earn. Our platform offers dozens of digital assets like Bitcoin, Ethereum, and stablecoins.",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Frequently Asked Questions</h2>
      {faqData.map((item, index) => (
        <div key={index} className={styles.faqItem}>
          <div className={styles.question} onClick={() => handleToggle(index)}>
            <div className={styles.qLeft}>
              <p>{index + 1}</p>
              <p>{item.question}</p>
            </div>
            <div className={styles.qRight}>
              {activeIndex === index ? <FaMinus /> : <FaPlus />}
            </div>
          </div>
          {activeIndex === index && (
            <motion.div initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }} className={styles.answer}>{item.answer}</motion.div>
          )}
        </div>
      ))}
    </div>
  );
};
export default FaqSection;
