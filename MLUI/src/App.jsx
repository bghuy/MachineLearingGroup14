import React, { Fragment, useEffect, useState } from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App(props) {
  useEffect(() => {

  }, []);
  return (
    <div>
      <Router>
        <Routes >
          {routes.map((route) => {
            const Page = route.page;
            const Layout = Fragment;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout >
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="light"
          pauseOnHover // Use equals sign and provide a string value
        />
      </Router>
    </div>
  );
}

export default App;