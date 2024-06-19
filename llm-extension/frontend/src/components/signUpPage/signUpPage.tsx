import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import "./signUpPage.css";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL as string,
  import.meta.env.VITE_SUPABASE_API_KEY as string
);

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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("Error signing up:", error.message);
        // Handle error (e.g., display error message)
      } else {
        console.log("User signed up:", data); // Successfully signed up user object
        // // Redirect to success page
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., display error message)
    }
  };

  // fix this, without useEffect it automatically goes to success
  // with useEffect, it will keep running multiple times including when the inspect console is opened
  // might be how navigate works
  supabase.auth.onAuthStateChange(async (event, session) => {
    // if signed in
    console.log(event, session);
    if (event === "SIGNED_IN") {
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
        </form>
      </div>
    </div>
  );
}
