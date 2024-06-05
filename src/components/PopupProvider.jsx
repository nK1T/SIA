import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [userData, setUserData] = useState({ email: '', username: '' });

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedUsername = localStorage.getItem('username');
    if (storedEmail && storedUsername) {
      setUserData({ email: storedEmail, username: storedUsername });
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://startupinvestorai.in/backend/api/getUsersDta.php?username=${userData.username}`
        );
        // Check if response.data is an array before setting state
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("Error: API response is not an array");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    if (userData.username) {
      fetchData();
    }
  }, [userData.username]);
  return (
    <PopupContext.Provider value={{ showSuccessPopup, setShowSuccessPopup, userData, data }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);
