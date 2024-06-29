import React, { useState } from "react";
import "./chatScreen.css";
// import ReactMarkdown from "react-markdown";
// import showdown from "showdown";
import Markdown from "marked-react";

// import axios from "axios";

interface UserInput {
  userInput: string;
}

// used to create the structure of both types of messages expected, user or llm
interface Message {
  text: string;
  isUser: boolean;
  isMarkdown: boolean;
}

export default function ChatScreen() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(Boolean);
  // managing this state so the fetch properly associates with the correct controller to abort
  const [controller, setController] = useState(new AbortController());

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSend = () => {
    if (text.trim() !== "") {
      const userMessage: Message = { text: text, isUser: true, isMarkdown: false };
      setMessages([...messages, userMessage]);
      setText("");

      // to make sure that the information being sent to backend is correct format
      const data = {
        userInput: text,
      };
      readStream(data);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const appendChunk = (value: string) => {
    // prevMessages is the current state of the messages array before updates

    setMessages((prevMessages) => {
      // gets the last message from prevMessages
      const lastMessage = prevMessages[prevMessages.length - 1];

      //   const cleanedValue = value.replace(/(?:\r\n|\r|\n)/g, "<br>");
      //   console.log(cleanedValue);
      // will only modify the llm responses
      if (lastMessage && !lastMessage.isUser) {
        // creates shallow copy of the prevMessages
        const updatedMessage = [...prevMessages];
        // creates new object with properties of lastMessage
        // and updates the text property
        // assigns new created object to the end of updatedMessage
        updatedMessage[updatedMessage.length - 1] = {
          ...lastMessage,
          text: lastMessage.text + value,
        };
        return updatedMessage;
      } else {
        return [...prevMessages, { text: value, isUser: false, isMarkdown: true }];
      }
    });
  };

  const abortStream = () => {
    controller.abort();
    setIsStreaming(false);
    console.log("Abort signal sent");
  };

  // refactored from axios due to axios not streaming on post requests
  const readStream = async (data: UserInput) => {
    const newController = new AbortController();
    setController(newController);

    try {
      const response = await fetch("http://127.0.0.1:8000/chat_stream/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: newController.signal,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body!.pipeThrough(new TextDecoderStream()).getReader();

      setIsStreaming(true);

      try {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { value, done } = await reader.read();

          if (done) break;
          appendChunk(value!);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Stream reading aborted");
        } else {
          throw error;
        }
      } finally {
        reader.releaseLock();
      }
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Fetch aborted");
      } else {
        console.error("Error with reading stream:", error);
      }
    }
  };

  return (
    <div className="chat-screen">
      <div className="chat-container">
        {messages.map((message, index) => (
          // displays the messages in their correct locations depending on if it's a user or llm message
          <div key={index} className={`message ${message.isUser ? "user-message" : "llm-message"}`}>
            {message.isMarkdown ? <Markdown>{message.text}</Markdown> : message.text}
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
        {isStreaming ? (
          <button onClick={abortStream}> abort </button>
        ) : (
          <button onClick={handleSend}>send</button>
        )}
      </div>
    </div>
  );
}
