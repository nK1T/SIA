import React from "react";
import { Link } from "react-router-dom";
import styles from "./sidebar.module.scss";
import { IoGiftSharp } from "react-icons/io5";
import { FaLock, FaReceipt, FaUser, FaWallet } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div>
      <ul className={styles.sidebarItems}>
        <Link to="/dashboard">
          <li
            className={`${styles.sidebarItem} ${
              location.pathname === "/dashboard" ? styles.active : ""
            }`}
          >
            <FaUser color="#892cdc" />
            Dashboard
          </li>
        </Link>
        <Link to="/myassets">
          <li
            className={`${styles.sidebarItem} ${
              location.pathname === "/myassets" ? styles.active : ""
            }`}
          >
            <FaWallet color="#892cdc" />
            Assets
          </li>
        </Link>
        <Link to="/orders">
          <li
            className={`${styles.sidebarItem} ${
              location.pathname === "/orders" ? styles.active : ""
            }`}
          >
            <FaReceipt color="#892cdc" />
            Orders<FaLock color="#F0B90B" size={12}/>
          </li>
        </Link>
        <Link to="/invites">
          <li
            className={`${styles.sidebarItem} ${
              location.pathname === "/invites" ? styles.active : ""
            }`}
          >
            <IoGiftSharp color="#892cdc"/>
            Invites
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
