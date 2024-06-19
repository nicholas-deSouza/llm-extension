import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Home } from "./components/home";
// import Settings from "./components/settingsPage/settings";
import SignUpPage from "./components/signUpPage/signUpPage";
import SuccessPage from "./components/successPage/successPage";
// import { format } from "path";
// import HomePage from "./components/homePage/homePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </Router>
      {/* <HomePage /> */}

      {/* <Settings /> */}
      {/* <Home /> */}
    </>
  );
}

export default App;
