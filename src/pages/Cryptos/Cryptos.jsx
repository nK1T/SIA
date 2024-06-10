import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from './cryptos.module.scss'

const Cryptos = () => {
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

        setCryptos(Object.values(response.data.data));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {isLoading && <p>Loading crypto prices...</p>}
      {error && <p>Error: {error.message}</p>}
      {cryptos.length > 0 && (
        <table className={styles.cryptoTable}>
          <thead>
            <tr>
              <th style={{textAlign:"start"}}>#</th>
              <th style={{textAlign:"start"}}>Name</th>
              <th style={{textAlign:"end"}}>Price</th>
              <th style={{textAlign:"end"}}>1h %</th>
              <th style={{textAlign:"end"}}>24h %</th>
              <th style={{textAlign:"end"}}>7d %</th>
              <th style={{textAlign:"end"}}>Market Cap</th>
              <th style={{textAlign:"end"}}>Volume(24h)</th>
              <th style={{textAlign:"end"}}>Circulating Supply</th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map((crypto, index) => (
              <tr key={crypto.id}>
                <td>{index + 1}</td>
                <td style={{display:"flex", alignItems:"center", gap:"5px"}}><img
                        src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`}
                        width={20}
                      />{crypto.name} <p style={{fontSize:"12px", fontWeight:"600", color:"#626581"}}>{crypto.symbol}</p></td>
                <td style={{textAlign:"end"}}>${crypto.quote.USD.price.toFixed(2)}</td>
                <td style={crypto.quote.USD.percent_change_24h < 0 ? { color: "#f6465d", textAlign: "end" } : { color: "#16c784", textAlign: "end" }}>{crypto.quote.USD.percent_change_1h.toFixed(2)}%</td>
                <td style={crypto.quote.USD.percent_change_24h < 0 ? { color: "#f6465d", textAlign: "end" } : { color: "#16c784", textAlign: "end" }}>{crypto.quote.USD.percent_change_24h.toFixed(2)}%</td>
                <td style={crypto.quote.USD.percent_change_24h < 0 ? { color: "#f6465d", textAlign: "end" } : { color: "#16c784", textAlign: "end" }}>{crypto.quote.USD.percent_change_7d.toFixed(2)}%</td>
                <td style={{textAlign:"end"}}>${crypto.quote.USD.market_cap.toFixed(2)}</td>
                <td style={{textAlign:"end"}}>${crypto.quote.USD.volume_24h.toFixed(2)}</td>
                <td style={{textAlign:"end"}}>{crypto.circulating_supply}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Cryptos;
