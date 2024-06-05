import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import PrivateRoute from "./components/PrivateRoute";
import Assets from "./pages/Assets/Assets";
import Deposit from "./pages/Deposit/Deposit";
import Dashboard from "./pages/Dashboard/Dashboard";
import { PopupProvider } from "./components/PopupProvider";
import Invites from "./pages/Invites/Invites";

const Layout1 = ({ children }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
};

const Layout2 = ({ children }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
};

function App() {
  const [isAuthenticated, setAuthenticated] = useState(() => {
    // Check if user is authenticated in localStorage
    return localStorage.getItem("isAuthenticated") === "true";
  });

  return (
    <PopupProvider>
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout1>
                <Home />
              </Layout1>
            </PrivateRoute>
          }
        />
        <Route
          path="/myassets"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout2>
                <Assets />
              </Layout2>
            </PrivateRoute>
          }
        />
        <Route
          path="/myassets/deposit"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout2>
                <Deposit />
              </Layout2>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout2>
                <Dashboard />
              </Layout2>
            </PrivateRoute>
          }
        />
        <Route
          path="/invites"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout2>
                <Invites />
              </Layout2>
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={<Login setAuthenticated={setAuthenticated} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
    </PopupProvider>
  );
}

export default App;
