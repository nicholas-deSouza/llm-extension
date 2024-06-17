import React from "react";
import "./settings.css";

export default function Settings() {
  return (
    <div className="settings-form-div">
      <form className="settings-form">
        <label>
          ChatGPT API Key:
          <input className="api-key" type="password" />
        </label>
        <label>
          Claude API Key:
          <input className="user-input" type="password" />
        </label>
        {/* <input type="submit" /> */}
      </form>
    </div>
  );
}
