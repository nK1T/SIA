import React, { useEffect, useState } from "react";
import styles from "./navbar.module.scss";
import {
  FaAngleDown,
  FaAngleUp,
  FaLock,
  FaPeopleArrows,
  FaHandHoldingHeart,
  FaNetworkWired,
  FaTicketAlt,
  FaDiscord,
  FaTelegramPlane,
  FaFacebookF,
  FaWallet,
  FaBitcoin,
  FaPiggyBank,
  FaGlobe,
  FaUserCircle,
  FaReceipt,
  FaUser,
} from "react-icons/fa";
import { FaRocket, FaGift } from "react-icons/fa6";
import {
  AiOutlineQuestionCircle,
  AiOutlineThunderbolt,
  AiFillBank,
  AiFillInstagram,
  AiFillDollarCircle,
} from "react-icons/ai";
import { GiReceiveMoney, GiHamburgerMenu } from "react-icons/gi";
import {
  MdOutlineFileDownload,
  MdDashboard,
  MdHomeFilled,
  MdVerified,
} from "react-icons/md";
import { RiNftFill, RiBarChart2Fill } from "react-icons/ri";
import { TfiReload } from "react-icons/tfi";
import { IoMdClose } from "react-icons/io";
import { IoShareSocial,IoGiftSharp  } from "react-icons/io5";
import { SiRabbitmq } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
const Navbar = () => {
  const [buyCrypto, setBuyCrypto] = useState(false);
  const [trade, setTrade] = useState(false);
  const [more, setMore] = useState(false);
  const [qr, setQr] = useState(false);
  const [support, setSupport] = useState(false);
  const [wallet, setWallet] = useState(false);
  const [profile, setProfile] = useState(false);
  const [email, setEmail] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    setAuthenticated(auth);
    const mail = localStorage.getItem("email");
    setEmail(mail);
  }, []);
  const menuItems = [
    {
      icon: FaBitcoin,
      text: "Buy Crypto",
      submenu: true,
      submenuItems: ["Express buy", "P2P Trading", "Third Party Payment"],
    },
    {
      icon: FaWallet,
      text: "Wallets",
      submenu: true,
      submenuItems: ["Metamask", "Trustwallet"],
    },
    { icon: RiBarChart2Fill, text: "Markets", submenu: false },
    {
      icon: FaPeopleArrows,
      text: "Trade",
      submenu: true,
      submenuItems: ["Spot", "Quick Trade"],
    },
    { icon: FaPiggyBank, text: "Earn", submenu: false },
    {
      icon: MdDashboard,
      text: "More",
      submenu: true,
      submenuItems: [
        "Launchpad & Launchpool",
        "NFT",
        "Loans",
        "Charity",
        "Referral",
        "Affiliates",
      ],
    },
    { icon: FaTicketAlt, text: "My Tickets", submenu: false },
    {
      icon: IoShareSocial,
      text: "Connect",
      submenu: true,
      submenuItems: ["Discord", "Telegram", "Instagram", "Facebook"],
    },
  ];

  const profileMenuItems = [
    {
      icon: FaUser,
      text: "Dashboard",
      link: "/dashboard",
    },
    {
      icon: FaWallet,
      text: "Assets",
      link: "/myassets",
    },
    {
      icon: FaReceipt,
      text: "Orders",
    },
    {
      icon: IoGiftSharp,
      text: "Invites",
    },
  ];
  const [activeHamburger, setActiveHamburger] = useState(false);
  useEffect(() => {
    if (activeHamburger) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "auto"; // Ensure overflow is reset when component unmounts
    };
  }, [activeHamburger]);
  const [activeProfile, setActiveProfile] = useState(false);
  useEffect(() => {
    if (activeProfile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "auto"; // Ensure overflow is reset when component unmounts
    };
  }, [activeProfile]);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const handleLogout = () => {
    const confirmation = window.confirm("Are you sure you want to logout?");
    if (confirmation) {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("email");
      localStorage.removeItem("username");
      localStorage.removeItem("createdAt");
      navigate("/login");
    }
  };
  const maskEmail = (email) => {
    const atIndex = email?.indexOf("@");
    const maskedPart = email?.substring(0, Math.min(3, atIndex)) + "****";
    const domainPart = email?.substring(atIndex);
    return maskedPart + domainPart;
  };
  return (
    <nav className={styles.navContainer}>
      <div className={styles.left}>
        <Tooltip
          anchorSelect="#my-anchor-element"
          content="Unlock Soon"
          style={{ backgroundColor: "#892cdc", zIndex: "999999" }}
        />
        <a href="/" className={styles.logo}>
          <img src="/logo2.png" />
          <p>IA</p>
        </a>
        <ul className={styles.links}>
          <li
            className={styles.link}
            onMouseEnter={() => setBuyCrypto(true)}
            onMouseLeave={() => setBuyCrypto(false)}
            onFocus={() => setBuyCrypto(true)}
            onBlur={() => setBuyCrypto(false)}
          >
            Buy Crypto
            {buyCrypto ? <FaAngleUp /> : <FaAngleDown />}
          </li>
          {buyCrypto && (
            <motion.ul
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={styles.buyCryptoDropdown}
              onMouseEnter={() => setBuyCrypto(true)}
              onMouseLeave={() => setBuyCrypto(false)}
            >
              <li>
                <a className={styles.box}>
                  <i>
                    <AiOutlineThunderbolt />
                  </i>
                  <div className={styles.itemBox} id="my-anchor-element">
                    <p>
                      Express buy
                      <FaLock color="#F0B90B" size={12} />
                    </p>
                    <p>Visa, Mastercard, & others</p>
                  </div>
                </a>
              </li>
              <li>
                <a className={styles.box}>
                  <i>
                    <FaPeopleArrows size={12} />
                  </i>
                  <div className={styles.itemBox} id="my-anchor-element">
                    <p>
                      P2P Trading
                      <FaLock color="#F0B90B" size={12} />
                    </p>
                    <p>
                      Buy/Sell with zero trading fees via 100+ payment methods
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a className={styles.box}>
                  <i>
                    <AiFillBank />
                  </i>
                  <div className={styles.itemBox} id="my-anchor-element">
                    <p>
                      Third-party payment
                      <FaLock color="#F0B90B" size={12} />
                    </p>
                    <p>Banxa, Simples, & others</p>
                  </div>
                </a>
              </li>
            </motion.ul>
          )}
          <li className={styles.link} id="my-anchor-element">
            Markets
            <FaLock color="#F0B90B" size={12} />
          </li>
          <li
            className={styles.link}
            onMouseEnter={() => setTrade(true)}
            onMouseLeave={() => setTrade(false)}
            onFocus={() => setTrade(true)}
            onBlur={() => setTrade(false)}
          >
            Trade
            {trade ? <FaAngleUp /> : <FaAngleDown />}
          </li>
          {trade && (
            <motion.ul
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={styles.tradeDropdown}
              onMouseEnter={() => setTrade(true)}
              onMouseLeave={() => setTrade(false)}
            >
              <li>
                <a className={styles.box}>
                  <i>
                    <TfiReload size={15} />
                  </i>
                  <div className={styles.itemBox} id="my-anchor-element">
                    <p>
                      Spot
                      <FaLock color="#F0B90B" size={12} />
                    </p>
                    <p>Buy and Sell on the Spot market with advanced tools</p>
                  </div>
                </a>
              </li>
              <li>
                <a className={styles.box}>
                  <i>
                    <SiRabbitmq size={15} />
                  </i>
                  <div className={styles.itemBox} id="my-anchor-element">
                    <p>Quick Trade<FaLock color="#F0B90B" size={12} /></p>
                    <p>Buy and Sell on the go Quickly</p>
                  </div>
                </a>
              </li>
            </motion.ul>
          )}
          <li className={styles.link} id="my-anchor-element">
            Earn
            <FaLock color="#F0B90B" size={12} />
          </li>
          <li
            className={styles.link}
            onMouseEnter={() => setMore(true)}
            onMouseLeave={() => setMore(false)}
            onFocus={() => setMore(true)}
            onBlur={() => setMore(false)}
          >
            More
            {more ? <FaAngleUp /> : <FaAngleDown />}
          </li>
          {more && (
            <motion.ul
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={styles.moreDropdown}
              onMouseEnter={() => setMore(true)}
              onMouseLeave={() => setMore(false)}
            >
              <li>
                <a className={styles.box}>
                  <i>
                    <FaRocket size={15} />
                  </i>
                  <div className={styles.itemBox} id="my-anchor-element">
                    <p>
                      Launchpad & Launchpool
                      <FaLock color="#F0B90B" size={12} />
                    </p>
                    <p>Discover and gain access to new token launches</p>
                  </div>
                </a>
              </li>
              <li>
                <a className={styles.box}>
                  <i>
                    <RiNftFill />
                  </i>
                  <div className={styles.itemBox} id="my-anchor-element">
                    <p>
                      NFT
                      <FaLock color="#F0B90B" size={12} />
                    </p>
                    <p>Explore NFTs from creators worldwide</p>
                  </div>
                </a>
              </li>
              <li>
                <a className={styles.box}>
                  <i>
                    <GiReceiveMoney />
                  </i>
                  <div className={styles.itemBox} id="my-anchor-element">
                    <p>
                      Loans
                      <FaLock color="#F0B90B" size={12} />
                    </p>
                    <p>Get an instant loan secured by crypto assets</p>
                  </div>
                </a>
              </li>
              <li>
                <a className={styles.box}>
                  <i>
                    <FaHandHoldingHeart />
                  </i>
                  <div className={styles.itemBox} id="my-anchor-element">
                    <p>
                      Charity
                      <FaLock color="#F0B90B" size={12} />
                    </p>
                    <p>
                      Blockchain empowers charity to be more transparent,
                      efficient, and traceable
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a className={styles.box}>
                  <i>
                    <FaGift size={15} />
                  </i>
                  <div className={styles.itemBox} id="my-anchor-element">
                    <p>
                      Referral
                      <FaLock color="#F0B90B" size={12} />
                    </p>
                    <p>Refer to your friends and earn</p>
                  </div>
                </a>
              </li>
              <li>
                <a className={styles.box}>
                  <i>
                    <FaNetworkWired />
                  </i>
                  <div className={styles.itemBox} id="my-anchor-element">
                    <p>
                      Affiliates
                      <FaLock color="#F0B90B" size={12} />
                    </p>
                    <p>Become our Affiliate</p>
                  </div>
                </a>
              </li>
            </motion.ul>
          )}
        </ul>
      </div>
      <div className={styles.right}>
        <div className={styles.search}>
          {/* <i>
            <FaSearch />
          </i> */}
          {!isAuthenticated && (
            <div className={styles.btns}>
              <Link to="/login">
                <button className={styles.loginBtn}>Log in</button>
              </Link>
              <Link to="/register">
                <button className={styles.signInBtn}>Sign Up</button>
              </Link>
            </div>
          )}
          <div className={styles.icons}>
            <i
              onMouseEnter={() => setProfile(true)}
              onMouseLeave={() => setProfile(false)}
              onFocus={() => setProfile(true)}
              onBlur={() => setProfile(false)}
              className={styles.icon}
            >
              <FaUserCircle size={22} />
            </i>
            {profile && (
              <motion.ul
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className={styles.profile}
                onMouseEnter={() => setProfile(true)}
                onMouseLeave={() => setProfile(false)}
              >
                <div className={styles.emailP}>
                  <p>{maskEmail(email)}</p>
                  {/* <div>
                    <MdVerified />
                    Verified
                  </div> */}
                </div>
                <Link to="/dashboard">
                  <li className={styles.box}>
                    <i>
                      <FaUser />
                    </i>
                    <div className={styles.itemBox}>
                      <p>Dashboard</p>
                    </div>
                  </li>
                </Link>
                <Link to="/myassets">
                  <li className={styles.box}>
                    <i>
                      <FaWallet />
                    </i>
                    <div className={styles.itemBox}>
                      <p>Assets</p>
                    </div>
                  </li>
                </Link>
                <Link to="/orders">
                  <li className={styles.box}>
                    <i>
                      <FaReceipt />
                    </i>
                    <div className={styles.itemBox} id="my-anchor-element">
                      <p>
                        Orders
                        <FaLock color="#F0B90B" size={12} />
                      </p>
                    </div>
                  </li>
                </Link>
                <Link to="/invites">
                  <li className={styles.box}>
                    <i>
                      <FaReceipt />
                    </i>
                    <div className={styles.itemBox}>
                      <p>
                        Invites
                      </p>
                    </div>
                  </li>
                </Link>
                {isAuthenticated && (
                  <div className={styles.logout}>
                    <button onClick={handleLogout} className={styles.btn1}>
                      Logout
                    </button>
                  </div>
                )}
              </motion.ul>
            )}
            <i
              onMouseEnter={() => setQr(true)}
              onMouseLeave={() => setQr(false)}
              onFocus={() => setQr(true)}
              onBlur={() => setQr(false)}
              className={styles.icon}
            >
              <MdOutlineFileDownload size={25} />
            </i>
            {qr && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className={styles.qrCode}
                onMouseEnter={() => setQr(true)}
                onMouseLeave={() => setQr(false)}
              >
                <div className={styles.qrWrap}>
                  <img src="/logo.png" />
                  <svg height="136" width="136" viewBox="0 0 41 41">
                    <path
                      fill="#FFFFFF"
                      d="M0,0 h41v41H0z"
                      shapeRendering="crispEdges"
                    ></path>
                    <path
                      fill="#000000"
                      d="M0 0h7v1H0zM8 0h2v1H8zM13 0h2v1H13zM17 0h7v1H17zM25 0h1v1H25zM28 0h1v1H28zM30 0h3v1H30zM34,0 h7v1H34zM0 1h1v1H0zM6 1h1v1H6zM8 1h2v1H8zM11 1h1v1H11zM14 1h2v1H14zM18 1h1v1H18zM23 1h3v1H23zM28 1h2v1H28zM34 1h1v1H34zM40,1 h1v1H40zM0 2h1v1H0zM2 2h3v1H2zM6 2h1v1H6zM10 2h1v1H10zM12 2h4v1H12zM17 2h1v1H17zM20 2h1v1H20zM23 2h2v1H23zM28 2h1v1H28zM30 2h1v1H30zM32 2h1v1H32zM34 2h1v1H34zM36 2h3v1H36zM40,2 h1v1H40zM0 3h1v1H0zM2 3h3v1H2zM6 3h1v1H6zM8 3h1v1H8zM11 3h1v1H11zM13 3h2v1H13zM16 3h1v1H16zM19 3h1v1H19zM21 3h1v1H21zM26 3h3v1H26zM30 3h2v1H30zM34 3h1v1H34zM36 3h3v1H36zM40,3 h1v1H40zM0 4h1v1H0zM2 4h3v1H2zM6 4h1v1H6zM10 4h1v1H10zM12 4h2v1H12zM16 4h1v1H16zM19 4h1v1H19zM22 4h1v1H22zM24 4h8v1H24zM34 4h1v1H34zM36 4h3v1H36zM40,4 h1v1H40zM0 5h1v1H0zM6 5h1v1H6zM10 5h1v1H10zM12 5h2v1H12zM16 5h5v1H16zM24 5h2v1H24zM29 5h3v1H29zM34 5h1v1H34zM40,5 h1v1H40zM0 6h7v1H0zM8 6h1v1H8zM10 6h1v1H10zM12 6h1v1H12zM14 6h1v1H14zM16 6h1v1H16zM18 6h1v1H18zM20 6h1v1H20zM22 6h1v1H22zM24 6h1v1H24zM26 6h1v1H26zM28 6h1v1H28zM30 6h1v1H30zM32 6h1v1H32zM34,6 h7v1H34zM8 7h2v1H8zM11 7h1v1H11zM15 7h4v1H15zM22 7h1v1H22zM24 7h1v1H24zM28 7h3v1H28zM0 8h1v1H0zM2 8h2v1H2zM5 8h3v1H5zM9 8h2v1H9zM13 8h3v1H13zM17 8h2v1H17zM21 8h3v1H21zM26 8h1v1H26zM28 8h3v1H28zM32 8h1v1H32zM34 8h1v1H34zM37 8h1v1H37zM39,8 h2v1H39zM3 9h1v1H3zM8 9h1v1H8zM11 9h2v1H11zM14 9h2v1H14zM17 9h3v1H17zM21 9h1v1H21zM23 9h1v1H23zM28 9h2v1H28zM31 9h2v1H31zM34 9h3v1H34zM38,9 h3v1H38zM0 10h1v1H0zM3 10h1v1H3zM6 10h5v1H6zM12 10h1v1H12zM18 10h1v1H18zM22 10h3v1H22zM30 10h1v1H30zM33 10h4v1H33zM38 10h1v1H38zM2 11h2v1H2zM7 11h1v1H7zM10 11h1v1H10zM14 11h1v1H14zM16 11h1v1H16zM18 11h3v1H18zM23 11h1v1H23zM25 11h1v1H25zM27 11h2v1H27zM30 11h1v1H30zM32 11h4v1H32zM39,11 h2v1H39zM2 12h1v1H2zM6 12h3v1H6zM10 12h1v1H10zM12 12h2v1H12zM15 12h3v1H15zM19 12h2v1H19zM22 12h1v1H22zM24 12h6v1H24zM31 12h1v1H31zM33 12h1v1H33zM37 12h2v1H37zM0 13h2v1H0zM3 13h1v1H3zM5 13h1v1H5zM7 13h5v1H7zM13 13h4v1H13zM18 13h1v1H18zM20 13h1v1H20zM22 13h5v1H22zM29 13h1v1H29zM40,13 h1v1H40zM1 14h2v1H1zM6 14h1v1H6zM8 14h1v1H8zM10 14h3v1H10zM15 14h7v1H15zM23 14h1v1H23zM25 14h1v1H25zM29 14h1v1H29zM34 14h1v1H34zM39,14 h2v1H39zM2 15h2v1H2zM5 15h1v1H5zM8 15h3v1H8zM14 15h3v1H14zM21 15h3v1H21zM26 15h2v1H26zM31 15h2v1H31zM34 15h4v1H34zM0 16h2v1H0zM4 16h4v1H4zM11 16h1v1H11zM16 16h1v1H16zM18 16h1v1H18zM20 16h3v1H20zM24 16h2v1H24zM30 16h2v1H30zM36 16h1v1H36zM38 16h1v1H38zM0 17h2v1H0zM3 17h1v1H3zM5 17h1v1H5zM12 17h1v1H12zM14 17h3v1H14zM20 17h2v1H20zM23 17h3v1H23zM27 17h1v1H27zM29 17h1v1H29zM31 17h3v1H31zM35 17h1v1H35zM38 17h1v1H38zM40,17 h1v1H40zM1 18h1v1H1zM5 18h2v1H5zM8 18h3v1H8zM13 18h1v1H13zM15 18h2v1H15zM18 18h1v1H18zM20 18h1v1H20zM22 18h1v1H22zM27 18h1v1H27zM29 18h1v1H29zM32 18h1v1H32zM34 18h1v1H34zM36 18h1v1H36zM38 18h1v1H38zM1 19h4v1H1zM7 19h6v1H7zM14 19h1v1H14zM17 19h3v1H17zM21 19h1v1H21zM23 19h2v1H23zM33 19h3v1H33zM37 19h3v1H37zM0 20h1v1H0zM4 20h3v1H4zM8 20h1v1H8zM11 20h2v1H11zM19 20h2v1H19zM23 20h1v1H23zM25 20h1v1H25zM30 20h1v1H30zM33 20h2v1H33zM36 20h4v1H36zM0 21h2v1H0zM3 21h1v1H3zM5 21h1v1H5zM8 21h4v1H8zM14 21h1v1H14zM16 21h1v1H16zM19 21h1v1H19zM23 21h1v1H23zM25 21h2v1H25zM28 21h1v1H28zM30 21h3v1H30zM34,21 h7v1H34zM0 22h1v1H0zM2 22h2v1H2zM6 22h5v1H6zM15 22h4v1H15zM21 22h5v1H21zM28 22h1v1H28zM30 22h1v1H30zM32 22h2v1H32zM36 22h1v1H36zM39 22h1v1H39zM2 23h1v1H2zM4 23h1v1H4zM7 23h1v1H7zM9 23h1v1H9zM11 23h4v1H11zM18 23h3v1H18zM22 23h2v1H22zM25 23h1v1H25zM27 23h1v1H27zM30 23h1v1H30zM32 23h5v1H32zM39,23 h2v1H39zM2 24h2v1H2zM5 24h2v1H5zM8 24h3v1H8zM15 24h3v1H15zM22 24h1v1H22zM24 24h3v1H24zM29 24h1v1H29zM31 24h1v1H31zM38 24h1v1H38zM0 25h3v1H0zM4 25h1v1H4zM7 25h3v1H7zM13 25h2v1H13zM17 25h1v1H17zM19 25h1v1H19zM24 25h12v1H24zM37 25h2v1H37zM40,25 h1v1H40zM0 26h2v1H0zM5 26h4v1H5zM11 26h7v1H11zM19 26h4v1H19zM25 26h2v1H25zM28 26h1v1H28zM31 26h3v1H31zM35 26h3v1H35zM39,26 h2v1H39zM0 27h2v1H0zM3 27h1v1H3zM7 27h3v1H7zM12 27h2v1H12zM18 27h4v1H18zM23 27h1v1H23zM26 27h1v1H26zM28 27h1v1H28zM31 27h4v1H31zM36 27h2v1H36zM39 27h1v1H39zM1 28h7v1H1zM9 28h1v1H9zM12 28h3v1H12zM18 28h5v1H18zM24 28h1v1H24zM27 28h1v1H27zM30 28h2v1H30zM33 28h5v1H33zM39,28 h2v1H39zM1 29h1v1H1zM4 29h1v1H4zM7 29h1v1H7zM9 29h1v1H9zM13 29h1v1H13zM15 29h2v1H15zM19 29h2v1H19zM22 29h1v1H22zM25 29h2v1H25zM31 29h1v1H31zM34 29h2v1H34zM38 29h1v1H38zM0 30h1v1H0zM2 30h5v1H2zM12 30h3v1H12zM17 30h1v1H17zM19 30h1v1H19zM22 30h1v1H22zM25 30h2v1H25zM30 30h1v1H30zM32 30h4v1H32zM38 30h1v1H38zM3 31h1v1H3zM8 31h2v1H8zM11 31h2v1H11zM14 31h6v1H14zM22 31h2v1H22zM27 31h4v1H27zM32 31h1v1H32zM34 31h1v1H34zM36 31h1v1H36zM38,31 h3v1H38zM1 32h1v1H1zM4 32h3v1H4zM9 32h3v1H9zM13 32h2v1H13zM17 32h2v1H17zM21 32h2v1H21zM24 32h1v1H24zM26 32h2v1H26zM29,32 h12v1H29zM8 33h4v1H8zM14 33h8v1H14zM23 33h3v1H23zM28 33h1v1H28zM30 33h1v1H30zM32 33h1v1H32zM36 33h1v1H36zM38,33 h3v1H38zM0 34h7v1H0zM8 34h1v1H8zM11 34h3v1H11zM16 34h1v1H16zM18 34h1v1H18zM20 34h1v1H20zM23 34h1v1H23zM25 34h1v1H25zM28 34h2v1H28zM31 34h2v1H31zM34 34h1v1H34zM36 34h3v1H36zM0 35h1v1H0zM6 35h1v1H6zM8 35h1v1H8zM10 35h1v1H10zM12 35h1v1H12zM15 35h1v1H15zM17 35h1v1H17zM20 35h1v1H20zM23 35h2v1H23zM30 35h1v1H30zM32 35h1v1H32zM36 35h1v1H36zM0 36h1v1H0zM2 36h3v1H2zM6 36h1v1H6zM9 36h2v1H9zM14 36h3v1H14zM19 36h1v1H19zM21 36h1v1H21zM23 36h1v1H23zM26 36h1v1H26zM28 36h1v1H28zM30 36h1v1H30zM32 36h5v1H32zM38 36h1v1H38zM40,36 h1v1H40zM0 37h1v1H0zM2 37h3v1H2zM6 37h1v1H6zM8 37h1v1H8zM10 37h1v1H10zM12 37h1v1H12zM15 37h1v1H15zM17 37h1v1H17zM19 37h1v1H19zM22 37h1v1H22zM24 37h1v1H24zM26 37h2v1H26zM29 37h2v1H29zM32 37h1v1H32zM36 37h1v1H36zM38 37h2v1H38zM0 38h1v1H0zM2 38h3v1H2zM6 38h1v1H6zM8 38h1v1H8zM11 38h5v1H11zM17 38h1v1H17zM19 38h4v1H19zM24 38h2v1H24zM28 38h3v1H28zM35 38h1v1H35zM38,38 h3v1H38zM0 39h1v1H0zM6 39h1v1H6zM10 39h2v1H10zM13 39h4v1H13zM19 39h1v1H19zM21 39h3v1H21zM26 39h3v1H26zM32 39h1v1H32zM36 39h2v1H36zM39 39h1v1H39zM0 40h7v1H0zM8 40h2v1H8zM11 40h2v1H11zM18 40h1v1H18zM20 40h3v1H20zM25 40h1v1H25zM31 40h4v1H31zM39 40h1v1H39z"
                      shapeRendering="crispEdges"
                    ></path>
                  </svg>
                </div>
                <p>Scan to Download App IOS & Android</p>
                <Link>
                  <button id="my-anchor-element">More Download Options</button>
                </Link>
              </motion.div>
            )}
            <i
              onMouseEnter={() => setWallet(true)}
              onMouseLeave={() => setWallet(false)}
              onFocus={() => setWallet(true)}
              onBlur={() => setWallet(false)}
              className={styles.icon}
            >
              <FaWallet size={20} />
            </i>
            {wallet && (
              <motion.ul
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className={styles.wallet}
                onMouseEnter={() => setWallet(true)}
                onMouseLeave={() => setWallet(false)}
              >
                <li>
                  <a className={styles.box}>
                    <img src="/Metamask-icon.png" width={18} />
                    <div className={styles.itemBox} id="my-anchor-element">
                      <p>
                        Metamask
                        <FaLock color="#F0B90B" size={12} />
                      </p>
                      <p>Connect with Metamask Wallet</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a className={styles.box}>
                    <img src="/Trustwallet-icon.png" width={18} />
                    <div className={styles.itemBox} id="my-anchor-element">
                      <p>
                        Trustwallet
                        <FaLock color="#F0B90B" size={12} />
                      </p>
                      <p>Connect with Trustwallet</p>
                    </div>
                  </a>
                </li>
              </motion.ul>
            )}
            <i
              onMouseEnter={() => setSupport(true)}
              onMouseLeave={() => setSupport(false)}
              onFocus={() => setSupport(true)}
              onBlur={() => setSupport(false)}
              className={styles.icon}
            >
              <AiOutlineQuestionCircle size={25} />
            </i>
            {support && (
              <motion.ul
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className={styles.support}
                onMouseEnter={() => setSupport(true)}
                onMouseLeave={() => setSupport(false)}
              >
                <li id="my-anchor-element">
                  My tickets
                  <i>
                    <FaTicketAlt />
                  </i>
                </li>
                <li>
                  Discord
                  <i>
                    <FaDiscord />
                  </i>
                </li>
                <li>
                  Telegram
                  <i>
                    <FaTelegramPlane />
                  </i>
                </li>
                <li>
                  Instagram
                  <i>
                    <AiFillInstagram />
                  </i>
                </li>
                <li>
                  Facebook
                  <i>
                    <FaFacebookF />
                  </i>
                </li>
              </motion.ul>
            )}
            <i
              onClick={() => setActiveProfile(true)}
              className={styles.hamProfile}
            >
              <FaUserCircle size={22} />
            </i>
            <i
              onClick={() => setActiveHamburger(true)}
              className={styles.hamBurger}
            >
              <GiHamburgerMenu size={25} />
            </i>
          </div>
        </div>
      </div>
      {activeHamburger && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={styles.hamContainer}
        >
          <div className={styles.closeBtn}>
            <i onClick={() => setActiveHamburger(false)}>
              <IoMdClose size={25} />
            </i>
          </div>
          <ul className={styles.items}>
            {!isAuthenticated && (
              <div className={styles.hamBtns}>
                <button
                  onClick={() => navigate("/login")}
                  className={styles.btn1}
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className={styles.btn2}
                >
                  Signup
                </button>
              </div>
            )}
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={styles.hamLinks}
                onClick={() => handleToggle(index)}
              >
                <div className={styles.hamLink}>
                  <span>
                    <i>
                      <item.icon />
                    </i>
                    {item.text}
                  </span>
                  {item.submenu && (
                    <i>
                      {activeIndex === index ? <FaAngleUp /> : <FaAngleDown />}
                    </i>
                  )}
                </div>
                {activeIndex === index && item.submenu && (
                  <div className={styles.hamLinkMenu}>
                    <motion.ul
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: "easeInOut",
                      }}
                    >
                      {/* Render submenu items dynamically */}
                      {item.submenuItems.map((submenuItem, subIndex) => (
                        <li key={subIndex}>
                          {submenuItem}
                          {
                            submenuItem !== "Discord" &&
                            submenuItem !== "Facebook" &&
                            submenuItem !== "Telegram" &&
                            submenuItem !== "Instagram" && (
                              <FaLock color="#F0B90B" size={12} />
                            )}
                        </li>
                      ))}
                    </motion.ul>
                  </div>
                )}
              </li>
            ))}
            {/* {isAuthenticated && (
              <div className={styles.logout}>
                <button onClick={handleLogout} className={styles.btn1}>
                  Logout
                </button>
              </div>
            )} */}
            <li className={styles.hamBottom}>
              <div className={styles.lang}>
                <FaGlobe size={20} />
                English (India)
              </div>
              <div className={styles.currency}>
                <AiFillDollarCircle size={23} />
                USD-$
              </div>
            </li>
          </ul>
        </motion.div>
      )}
      {activeProfile && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={styles.hamContainer}
        >
          <div className={styles.closeBtn}>
            <i onClick={() => setActiveProfile(false)}>
              <IoMdClose size={25} />
            </i>
          </div>
          <div className={styles.emailP}>
            <p>{maskEmail(email)}</p>
            {/* <div>
              <MdVerified />
              Verified
            </div> */}
          </div>
          <ul className={styles.items2}>
            {profileMenuItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                onClick={() => setActiveProfile(false)}
              >
                <li className={styles.hamLinks}>
                  <div className={styles.hamLink}>
                    <span>
                      <i>
                        <item.icon />
                      </i>
                      {item.text}
                      {item.text == "Orders" && (
                        <FaLock color="#F0B90B" size={12} />
                      )}
                    </span>
                  </div>
                </li>
              </Link>
            ))}
            {isAuthenticated && (
              <div className={styles.logout}>
                <button onClick={handleLogout} className={styles.btn1}>
                  Logout
                </button>
              </div>
            )}
          </ul>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
