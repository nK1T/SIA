import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MdPending, MdVerified } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePopup } from "../../components/PopupProvider";

const Dashboard = () => {
  const { userData, data } = usePopup();
  console.log(userData);
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Dashboard";
  }, []);
  const notify = () =>
    toast("Copied to Clipboard ✔️", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      // transition: Bounce,
    });

  return (
    <div className={styles.container}>
      {data.map((item) => (
        <div key={item.id} className={styles.wrapper}>
          <div className={styles.left}>
            <Sidebar />
          </div>
          <div className={styles.right}>
            <ToastContainer position="top-right" />
            <div className={styles.topRight}>
              <div className={styles.topRightLeft}>
                <div className={styles.avatar}>
                  <img src="/avatar.png" width={100} />
                  <div className={styles.email}>
                    <p>{item.email}</p>
                    <div style={{
                              backgroundColor:
                                item.verification === "pending"
                                  ? "#f0bb0b30"
                                  :"#102821",
                              color:
                                item.verification === "pending"
                                  ? "#F0B90B"
                                  :"#0ecb81"
                            }}>
                              {item.verification === "pending"?
                              <MdPending />
                              :
                              <MdVerified />
                            }
                      {item.verification}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.topRightRight}>
                <h3>
                  Referral Code
                  <FaCopy
                    color="#892cdc"
                    size={17}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigator.clipboard.writeText(item.username),
                        notify();
                    }}
                  />
                </h3>
                <p>{item.username}</p>
              </div>
            </div>
            {/* <div className={styles.midRight}>
            <h2>Your Invites</h2>
              <div className={styles.tableData}>
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
                        <td>${item.deposit.depositAmount*0.02}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
