import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import "./css/style.scss";

import Dashboard from "./pages/Dashboard";
import PalatizationDashboard from "./pages/PaletizationDashboard";
import Signin from "./pages/Signin";
import LabelPrinting from "./partials/genealogy/LabelPrinting";

//PRIVATE ROUTE AND PUBLIC ROUTE
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import toast, { Toaster, ToastBar } from "react-hot-toast";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Navigate to="/genealogy" />} />
        <Route
          exact
          // path='mp-pro/'
          path="/genealogy"
          element={
            <PublicRoute>
              <Dashboard />
            </PublicRoute>
          }
        />

        <Route
          exact
          // path='mp-pro/'
          path="/paletization"
          element={
            <PublicRoute>
              <PalatizationDashboard />
            </PublicRoute>
          }
        />

        <Route
          path="/signin"
          element={
            <PublicRoute>
              <Signin />
            </PublicRoute>
          }
        />

        <Route
          path="/print-label"
          element={
            <PublicRoute>
              <LabelPrinting />
            </PublicRoute>
          }
        />
      </Routes>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        containerClassName="bg-transparent"
        containerStyle={{ backgroundColor: "transparent", background: "transparent" }}
        toastOptions={{
          // Define default options
          style: {
           
          },
          
          duration: 5000,

          // Default options for specific types
          success: {
            duration: 3000,
          },
        }}
      >
        {(t) => (
          <ToastBar
           
            toast={t}
          ></ToastBar>
        )}
      </Toaster>
    </>
  );
}

export default App;
