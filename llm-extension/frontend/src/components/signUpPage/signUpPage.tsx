import React from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import "./signUpPage.css";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL as string,
  import.meta.env.VITE_SUPABASE_API_KEY as string
);

export default function SignUpPage() {
  const navigate = useNavigate();

  supabase.auth.onAuthStateChange(async (event) => {
    if (event !== "SIGNED_OUT") {
      // forward to success URL
      navigate("/success");
    } else {
      // forward to localhost:3000
      navigate("/");
    }
  });

  return (
    <div>
      <div className="app-name">
        <h1>placeholder</h1>
      </div>
      <div className="create-account">
        <h2>Create your account</h2>
      </div>
      <div className="create-account-form-div">
        <form className="create-account-form">
          <label className="email-label">
            <h3>Email address:</h3>
            <input className="email-input" />
          </label>
          <label>
            <h3>Password:</h3>
            <input className="password-input" type="password" />
          </label>
          <button className="sign-up-btn">
            <h3>Sign up</h3>
          </button>
          {/* <input type="submit" /> */}
        </form>
      </div>
    </div>
  );
}
