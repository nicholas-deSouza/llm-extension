import React, { useState } from "react";
import "./chatScreen.css";
import axios from "axios";

interface UserInput {
  userInput: string;
}

// used to create the structure of both types of messages expected, user or llm
interface Message {
  text: string;
  isUser: boolean;
}

export default function ChatScreen() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSend = () => {
    if (text.trim() !== "") {
      const userMessage: Message = { text: text, isUser: true };
      setMessages([...messages, userMessage]);
      setText("");

      // to make sure that the information being sent to backend is correct format
      const data = {
        userInput: text,
      };
      sendUserInput(data);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const sendUserInput = async (data: UserInput) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/get_llm_response/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response && response.data && response.data.response && response.data.response.content) {
        const llmMessage: Message = { text: response.data.response.content, isUser: false };
        setMessages((prevMessages) => [...prevMessages, llmMessage]);
      } else {
        console.error("Invalid response format:", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="chat-screen">
      <div className="chat-container">
        {messages.map((message, index) => (
          // displays the messages in their correct locations depending on if it's a user or llm message
          <div key={index} className={`message ${message.isUser ? "user-message" : "llm-message"}`}>
            {message.text}
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
        />
        <button onClick={handleSend}>send</button>
      </div>
    </div>
  );
}
