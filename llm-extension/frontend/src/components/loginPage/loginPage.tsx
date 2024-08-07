import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
// import { createClient } from "@supabase/supabase-js";
import "./loginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onLogIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Error signing in:", error.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // destructuring the object returned by supabase.auth.onAuthStateChange
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN") {
        navigate("/success");
      } else {
        navigate("/login");
      }
    });

    // this removes the listener created above to stop the component from being re rendered
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div>
      <div className="app-name">
        <h1>placeholder</h1>
      </div>
      <div className="login-account">
        <h2>Login to your account</h2>
      </div>
      <div className="login-account-form-div">
        <form className="login-account-form">
          <label className="email-label">
            <h3>Email address:</h3>
            <input className="email-input" value={email} onChange={handleEmailTextChange} />
          </label>
          <label>
            <h3>Password:</h3>
            <input
              className="password-input"
              type="password"
              value={password}
              onChange={handlePasswordTextChange}
            />
          </label>
          <button onClick={onLogIn} className="login-btn">
            <h3>Login</h3>
          </button>
          <p>
            Don't have an account? <Link to="/signup">Sign up here!</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
