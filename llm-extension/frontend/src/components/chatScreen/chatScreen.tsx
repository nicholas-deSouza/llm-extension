import React, { useState } from "react";
import "./chatScreen.css";
import axios from "axios";

interface UserInput {
  userInput: string;
}

// so the frontend understands the structure of the response object coming from the backend
interface ApiResponse {
  response: {
    content: string;
  };
}

export default function ChatScreen() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSend = () => {
    if (text.trim() !== "") {
      setMessages([...messages, text]);
      setText("");
    }

    const data = {
      userInput: text,
    };
    sendUserInput(data);
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
        setApiResponse(response.data);
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
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
      <div>{apiResponse?.response.content}</div>
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
