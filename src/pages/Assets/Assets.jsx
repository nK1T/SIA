import React, { useEffect, useState } from "react";
import styles from "./assets.module.scss";
import { IoHomeSharp } from "react-icons/io5";
import {
  FaWallet,
  FaReceipt,
  FaAngleRight,
  FaLock,
  FaCopy,
} from "react-icons/fa";
import Chart from "react-apexcharts";
import { TbCaretUpDownFilled } from "react-icons/tb";
import { IoDocumentSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Popup from "reactjs-popup";
import { usePopup } from "../../components/PopupProvider";
import { Tooltip } from "react-tooltip";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Assets = () => {
  const { showSuccessPopup, setShowSuccessPopup, userData } = usePopup();
  const [data, setData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "price",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
    options: {
      grid: {
        show: false,
      },

      colors: ["#892cdc"],
      chart: {
        toolbar: false,
        type: "area",
        foreColor: "#ccd6fc",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        enabled: false,
        type: "datetime",
        categories: [
          "2024-04-19",
          "2024-04-20",
          "2024-04-21",
          "2024-04-22",
          "2024-04-23",
          "2024-04-24",
          "2024-04-25",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy",
        },
      },
      responsive: [
        {
          breakpoint: 1000,

          options: {
            width: "300px",
          },
        },
      ],
    },
  });
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Assets";
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://startupinvestorai.in/backend/api/getAssets.php?email=${userData.email}`
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

    if (userData.email) {
      fetchData();
    }
  }, [userData.email]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://startupinvestorai.in/backend/api/getTransactions.php?email=${userData.email}`
        );
        // Check if response.data is an array before setting state
        if (Array.isArray(response.data)) {
          setTransactionsData(response.data);
        } else {
          console.error("Error: API response is not an array");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (userData.email) {
      fetchData();
    }
  }, [userData.email]);

  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnName);
      setSortOrder("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    }
    return 0;
  });
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
  const estimatedBalance = transactionsData
    .filter((item) => item.status === "approved") // Filter transactions with status "approved"
    .reduce((total, item) => total + parseFloat(item.depositAmount), 0); // Sum up depositAmounts
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {showSuccessPopup && (
          <Popup
            open={showSuccessPopup}
            onClose={() => setShowSuccessPopup(false)}
          >
            <div className={styles.modal}>
              <button
                className={styles.close}
                onClick={() => setShowSuccessPopup(false)}
              >
                &times;
              </button>
              <div className={styles.header}>Deposit Successful</div>
              <div className={styles.content}>
                Your deposit has been successfully submitted. It may take up to
                2 hours for the deposited amount to reflect in your account.
              </div>
            </div>
          </Popup>
        )}
        <div className={styles.left}>
          <Sidebar />
        </div>
        <div className={styles.right}>
          <ToastContainer position="top-right" />
          <div className={styles.topRight}>
            <div className={styles.topRightLeft}>
              <h2>Estimated Balance</h2>
              <p>{estimatedBalance.toFixed(2)}</p>
              <p>≈ ${estimatedBalance.toFixed(2)}</p>
              <span>
                <p>
                  Today‘s PnL
                  <FaLock color="#F0B90B" size={12} />
                </p>
              </span>
            </div>
            <div className={styles.topRightRight}>
              <div className={styles.btns}>
                <Link to="/myassets/deposit" className={styles.btn}>
                  <button>Deposit</button>
                </Link>
                <Link className={styles.btn}>
                  <button id="my-anchor-element">
                    Withdraw <FaLock color="#F0B90B" size={12} />
                    <Tooltip
                      anchorSelect="#my-anchor-element"
                      content="Unlock Soon"
                      style={{ backgroundColor: "#191919" }}
                    />
                  </button>
                </Link>
                <Link className={styles.btn}>
                  <button id="my-anchor-element">
                    Transfer
                    <FaLock color="#F0B90B" size={12} />
                  </button>
                </Link>
              </div>
              <div className={styles.chart}>
                <Chart
                  options={chartData.options}
                  series={chartData.series}
                  type="area"
                  height={120}
                />
              </div>
            </div>
          </div>
          <div className={styles.midRight}>
            <h2>My Assets</h2>
            <div className={styles.tableData}>
              {sortedData == null ? (
                <table>
                  <thead>
                    <tr>
                      <th onClick={() => handleSort("coin")}>
                        <p>
                          Coin
                          <TbCaretUpDownFilled />
                        </p>
                      </th>
                      <th onClick={() => handleSort("amount")}>
                        <p>
                          Amount
                          <TbCaretUpDownFilled />
                        </p>
                      </th>
                      <th onClick={() => handleSort("coinPrice")}>
                        <p>
                          Price
                          <TbCaretUpDownFilled />
                        </p>
                      </th>
                      <th onClick={() => handleSort("todayPnL")}>
                        <p>
                          PnL
                          <TbCaretUpDownFilled />
                        </p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.coin.substr(0, 4)}</td>
                        <td>{item.amount}</td>
                        <td>${item.amount}</td>
                        {/* change pnl (profit and loss in the line below) */}
                        <td>$0</td>
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
          <div className={styles.bottomRight}>
            <h2>Recent Transactions</h2>
            <div className={styles.bottomRightContent}>
              <div className={styles.tableData}>
                {transactionsData == null ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Coin</th>
                        <th>Amount</th>
                        <th>Network</th>
                        <th>Address</th>
                        <th>Txn Id</th>
                        <th>Time</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactionsData.map((item, index) => (
                        <tr key={index}>
                          <td>{item.coin.substr(0, 4)}</td>
                          <td>{item.depositAmount}$</td>
                          <td>{item.network.substr(0, 3)}</td>
                          <td>
                            {item.address.slice(0, 4) +
                              "..." +
                              item.address.slice(-4)}
                            <FaCopy
                              color="#892cdc"
                              size={10}
                              style={{ cursor: "pointer", marginLeft: "5px" }}
                              onClick={() => {
                                navigator.clipboard.writeText(item.address),
                                  notify();
                              }}
                            />
                          </td>
                          <td>{item.transactionId}</td>
                          {/* change pnl (profit and loss in the line below) */}
                          <td>{item.date.substr(0, 10)}</td>
                          <td
                            style={{
                              color:
                                item.status === "pending"
                                  ? "#F0B90B"
                                  : item.status === "approved"
                                  ? "#08bc81"
                                  : "crimson",
                            }}
                          >
                            {item.status}
                          </td>
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
      </div>
    </div>
  );
};

export default Assets;
