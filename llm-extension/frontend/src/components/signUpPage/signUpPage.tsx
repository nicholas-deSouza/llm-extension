import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
// import { createClient } from "@supabase/supabase-js";
import "./signUpPage.css";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onSignUp = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("Error signing up:", error.message);
      } else {
        alert("Check your email for the login link");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // destructuring the object returned by supabase.auth.onAuthStateChange
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(session);
      if (event === "SIGNED_IN") {
        navigate("/success");
      }
      // else {
      //   navigate("/login");
      // }
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
      <div className="create-account">
        <h2>Create your account</h2>
      </div>
      <div className="create-account-form-div">
        <form className="create-account-form">
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
          <button onClick={onSignUp} className="sign-up-btn">
            <h3>Sign up</h3>
          </button>
          <p>
            Already have an account? <Link to="/login">Login here!</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
