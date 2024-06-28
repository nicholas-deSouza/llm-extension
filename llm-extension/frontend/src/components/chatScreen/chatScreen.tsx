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
  //   const [streamingMessage, setStreamingMessage] = useState("");

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

  //refactor this to use fetch instead to stream responses
  //   const sendUserInput = async (data: UserInput) => {
  //     try {
  //       const response = await axios.post("http://127.0.0.1:8000/chat_stream/", data, {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (response && response.data) {
  //         const llmMessage: Message = { text: response.data, isUser: false };
  //         setMessages((prevMessages) => [...prevMessages, llmMessage]);
  //       } else {
  //         console.error("Invalid response format:", response.data);
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  const appendChunk = (value: string) => {
    // prevMessages is the current state of the messages array before updates

    // const converter = new showdown.Converter();

    // converter.makeHTML(value);

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

  // refactored from axios due to axios not streaming on post requests
  const readStream = async (data: UserInput) => {
    try {
      await fetch("http://127.0.0.1:8000/chat_stream/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(async function (response) {
        const reader = response.body!.pipeThrough(new TextDecoderStream()).getReader();

        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { value, done } = await reader.read();

          if (done) break;
          appendChunk(value!);
          //   console.log("Received", value);
        }

        // const llmMessage: Message = { text: streamingMessage, isUser: false };
        // setMessages((prevMessages) => [...prevMessages, llmMessage]);
        // setStreamingMessage("");

        // const responseText = await response.text();
        // console.log(responseText);
        // const llmMessage: Message = { text: responseText, isUser: false };
        // setMessages((prevMessages) => [...prevMessages, llmMessage]);
        //   return response.text();
      });
    } catch (error) {
      console.log("Error with reading stream:", error);
    }
  };

  return (
    <div className="chat-screen">
      <div className="chat-container">
        {/* <div className="test">hi, {inProgress}</div> */}
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
        <button onClick={handleSend}>send</button>
      </div>
    </div>
  );
}
