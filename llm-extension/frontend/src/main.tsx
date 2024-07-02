import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
// import LoginPage from "./components/loginPage/loginPage.tsx";
import ChatScreen from "./components/chatScreen/chatScreen";
// import { Home } from "./components/home";
import Settings from "./components/settingsPage/settings";
// import SignUpPage from "./components/signUpPage/signUpPage";
import SuccessPage from "./components/successPage/successPage";
import LoginPage from "./components/loginPage/loginPage";
import HomePage from "./components/homePage/homePage";

{
  /* <Route path="/" element={<Navigate to="/login" />} /> */
}
{
  /* <Route path="#/" element={<ChatScreen />} /> */
}
{
  /* <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/chat" element={<ChatScreen />} /> */
}

const router = createHashRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  // {
  //   path: "/",
  //   element: <SignUpPage />,
  // },
  {
    path: "/signup",
    element: <Settings />,
  },
  {
    path: "/success",
    element: <SuccessPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/chat",
    element: <ChatScreen />,
  },
  // {
  //   path: "/app",
  //   element: <App />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // the cause of multiple re renders
  <React.StrictMode>
    <App />
    <RouterProvider router={router} />
  </React.StrictMode>
);
