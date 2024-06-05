import React from "react";
import styles from "./footer.module.scss";
import { Link } from "react-router-dom";
import {
  FaDiscord,
  FaInstagram,
  FaReddit,
  FaGlobe,
  FaTelegram,
  FaYoutube,
  FaRegCopyright,
  FaLock
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiFillDollarCircle } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.content}>
        <div className={styles.navList}>
          <div className={styles.navListGroup}>
            <h3>About Us<FaLock color="#F0B90B" size={12} /></h3>
            <ul>
              <li>Home</li>
              <li>Announcements</li>
              <li>News</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Legal</li>
              <li>Blog</li>
              <li>Press</li>
            </ul>
          </div>
          <div className={styles.navListGroup}>
            <h3>Learn<FaLock color="#F0B90B" size={12} /></h3>
            <ul>
              <li>Learn & Earn</li>
              <li>Browse Crypto Prices</li>
              <li>Bitcoin Price</li>
              <li>Ethereum Price</li>
              <li>Price Predictions</li>
              <li>Buy Bitcoin</li>
              <li>Buy Etherium</li>
              <li>Buy SIA</li>
              <li>Buy Tradable Altcoins</li>
            </ul>
          </div>
          <div className={styles.navListGroup}>
            <h3>Service<FaLock color="#F0B90B" size={12} /></h3>
            <ul>
              <li>Affiliate</li>
              <li>Referral</li>
              <li>OTC Trading</li>
              <li>Historical Market Data</li>
              <li>Proof of Reserves</li>
            </ul>
          </div>
          <div className={styles.navListGroup}>
            <h3>Support<FaLock color="#F0B90B" size={12} /></h3>
            <ul>
              <li>24/7 Chat Support</li>
              <li>help@startupinvestorai.in</li>
              <li>My Tickets</li>
              <li>Feedback & Suggestions</li>
              <li>Fees</li>
              <li>Trading Rules</li>
            </ul>
          </div>
        </div>
        <div className={styles.community}>
          <h3>Community<FaLock color="#F0B90B" size={12} /></h3>
          <div className={styles.icons}>
            <div className={styles.icon}>
              <a>
                <FaDiscord />
              </a>
            </div>
            <div className={styles.icon}>
              <a>
                <FaInstagram />
              </a>
            </div>
            <div className={styles.icon}>
              <a>
                <FaTelegram />
              </a>
            </div>
            <div className={styles.icon}>
              <a>
                <FaXTwitter />
              </a>
            </div>
            <div className={styles.icon}>
              <a>
                <FaReddit />
              </a>
            </div>
            <div className={styles.icon}>
              <a>
                <FaYoutube />
              </a>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.lang}>
              <FaGlobe size={20} />
              English (India)
            </div>
            <div className={styles.currency}>
              <AiFillDollarCircle size={23} />
              USD-$
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>
        STRATUP INVESTOR AI <FaRegCopyright/>&nbsp;2024
        </p>
      </div>
    </footer>
  );
};

export default Footer;
