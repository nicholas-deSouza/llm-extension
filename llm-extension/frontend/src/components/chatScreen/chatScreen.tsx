import React, { useState } from "react";
import "./chatScreen.css";

export default function ChatScreen() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSend = () => {
    if (text.trim() !== "") {
      // creates a new array appending everything already in the messages array and adding the text
      // new array replaces the old array with state replacement and garbage collection handles removal of old array
      setMessages([...messages, text]);
      setText("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chat-screen">
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          className="user-input"
          type="text"
          value={text}
          placeholder="Ask your question to the LLM"
          onChange={handleTextChange}
          onKeyDown={handleKeyPress}
        ></input>
        <button onClick={handleSend}> send </button>
      </div>
    </div>
  );
}
