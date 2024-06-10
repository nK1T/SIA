import React, { useEffect, useState } from "react";
import styles from "./heroSection.module.scss";
import { FaBitcoin, FaEthereum, FaAngleRight, FaLock } from "react-icons/fa";
import { SiDogecoin } from "react-icons/si";

import { Link } from "react-router-dom";
import axios from "axios";

const HeroSection = () => {
  const [cryptos, setCryptos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "https://talentfiner.in/backend/support/proxy.php"
        );

        setCryptos(Object.values(response.data.data).slice(0, 3));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.heading}>
          <h1>Faster, better, stronger than your average crypto exchange</h1>
          <div>
            <span>22+</span>
            <p>Users Trust Us</p>
          </div>
          {/* <p>
            <IoGiftSharp size={17} color="#892cdc" />
            Sign up now and get up to 100 USDT in rewards
          </p> */}
        </div>
        <div className={styles.leftBottom}>
          {isLoading && <p>Loading crypto prices...</p>}
          {error && <p>Error: {error.message}</p>}
          {cryptos.length > 0 && (
            <ul>
              {cryptos.map((crypto) => (
                <li key={crypto.id}>
                  <div className={styles.coin}>
                    <div className={styles.coinLeft}>
                      <img
                        src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`}
                        width={16}
                      />
                      {crypto.symbol} <p>{crypto.name}</p>
                    </div>
                    <div className={styles.coinMid}>
                      ${crypto.quote.USD.price}
                    </div>
                    <div
                      className={styles.coinRight}
                      style={
                        crypto.quote.USD.percent_change_24h < 0
                          ? { color: "#f6465d" }
                          : { color: "#16c784" }
                      }
                    >
                      {crypto.quote.USD.percent_change_24h.toFixed(8)}%
                    </div>
                  </div>
                </li>
              ))}
              {/* <li>
                <div className={styles.coin}>
                  <div className={styles.coinLeft}>
                    <img src="/eth.png" width={20} />
                    ETH
                    <p>Ethereum</p>
                  </div>
                  <div className={styles.coinMid}>$3,431.68</div>
                  <div className={styles.coinRight}>-4.36%</div>
                </div>
              </li>
              <li>
                <div className={styles.coin}>
                  <div className={styles.coinLeft}>
                    <img src="/logo.png" width={20} />
                    SIA
                    <p>SIA</p>
                  </div>
                  <div className={styles.coinMid}>$0.0012</div>
                  <div
                    className={styles.coinRight}
                    style={{ color: "#0ECB81" }}
                  >
                    +0.00%
                  </div>
                </div>
              </li> */}
            </ul>
          )}
          <Link className={styles.moreCoin} to="/cryptos">
            <p>
              View All 300+ Coins
              <FaLock color="#F0B90B" size={12} />
            </p>
            <FaAngleRight />
          </Link>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.video}>
          <video
            autoPlay
            loop
            muted
            playsInline
            // width={246}
            poster="https://www.okx.com/cdn/assets/imgs/243/F485DEA432C68FD9.png?x-oss-process=image/format,webp"
          >
            <source src="/introVideo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
