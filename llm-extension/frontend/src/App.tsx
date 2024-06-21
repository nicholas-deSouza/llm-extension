import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { Home } from "./components/home";
// import Settings from "./components/settingsPage/settings";
import SignUpPage from "./components/signUpPage/signUpPage";
import SuccessPage from "./components/successPage/successPage";
import LoginPage from "./components/loginPage/loginPage";
// import HomePage from "./components/homePage/homePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
