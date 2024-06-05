import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./invites.module.scss";
import { usePopup } from "../../components/PopupProvider";
import Sidebar from "../../components/Sidebar/Sidebar";
import { IoDocumentSharp } from "react-icons/io5";

const Invites = () => {
  const [data, setData] = useState([]);
  const { userData } = usePopup();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://startupinvestorai.in/backend/api/getInvites.php?username=${userData.username}`
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
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Sidebar />
        </div>
        <div className={styles.midRight}>
          <h2>Your Invites</h2>
          <div className={styles.tableData}>
            {data == null ? (
              <table>
                <thead>
                  <tr>
                    <th>
                      <p>Email</p>
                    </th>
                    <th>
                      <p>Joined Date</p>
                    </th>
                    <th>
                      <p>First Deposit</p>
                    </th>
                    <th>
                      <p>Your Commission</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.user.email}</td>
                      <td>{item.user.createdAt}</td>
                      <td>${item.deposit.depositAmount}</td>
                      <td>${item.deposit.depositAmount * 0.02}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={styles.noData}>
                <i>
                  <IoDocumentSharp />
                </i>
                <p>No Record Found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invites;
