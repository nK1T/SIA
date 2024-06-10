import axios from "axios";
import React, { useEffect, useState } from "react";

const Test = () => {
  const [cryptos, setCryptos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "https://talentfiner.in/backend/support/proxy.php",
        );

        setCryptos(Object.values(response.data.data).slice(0,5));
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
        <ul>
          {cryptos.map((crypto) => (
            <li style={{color:"white"}} key={crypto.id}>
              {crypto.name} ({crypto.symbol}) - ${crypto.quote.USD.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Test;
