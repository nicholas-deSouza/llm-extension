import React from "react";
import "./App.css";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import { Home } from "./components/home";
// import Settings from "./components/settingsPage/settings";
// import SignUpPage from "./components/signUpPage/signUpPage";
// import SuccessPage from "./components/successPage/successPage";
// import LoginPage from "./components/loginPage/loginPage";
// import HomePage from "./components/homePage/homePage";
// import ChatScreen from "./components/chatScreen/chatScreen";
// import LoginPage from "./components/loginPage/loginPage";

function App() {
  return (
    <>
      {/* <Router>
        <Routes> */}
      {/* redirects so that i don't manually have to do it */}
      {/* <Route path="/" element={<Navigate to="/signup" />} /> */}
      {/* <Route path="#/" element={<ChatScreen />} /> */}
      {/* <Route path="/signup" element={<SignUpPage />} />
          <Route path="/success" element={<SuccessPage />} /> */}
      {/* <Route path="/signup" element={<SignUpPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/chat" element={<ChatScreen />} /> */}
      {/* </Routes>
      </Router> */}
    </>
  );
}

export default App;
