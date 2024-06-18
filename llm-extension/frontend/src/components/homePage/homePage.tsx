import React from "react";
import "./homePage.css";

export default function HomePage() {
  return (
    <div>
      <div className="profile-icon-div">
        <a>temp</a>
      </div>
      <div className="chats-div">
        <text>Chats + </text>
      </div>
      <div className="choose-llm-btn-div">
        <button>
          <h2>ChatGPT</h2>
        </button>
        <button>
          <h2>Claude</h2>
        </button>
      </div>
    </div>
  );
}
