// from https://ibaslogic.com/simple-guide-to-react-form/
import { useState } from "react";

import axios from "axios";
import React from "react";

// object shape of information recieved from form
interface FormData {
  api_key: string;
  query: string;
}

const Form = () => {
  const [apiKey, setapiKey] = useState("");
  const [text, setText] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleAPITextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setapiKey(event.target.value);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const passwordView = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      api_key: apiKey,
      query: text,
    };
    sendQueryAndKey(data);
  };

  const sendQueryAndKey = async (data: FormData) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/run_query/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          LLM API Key:{""}
          <input
            className="api-key"
            type={showPassword ? "text" : "password"}
            value={apiKey}
            onChange={handleAPITextChange}
          ></input>
          What's your question?:{""}
          <input
            className="user-input"
            type="text"
            value={text}
            onChange={handleTextChange}
          ></input>
          <input type="submit"></input>
        </label>
      </form>
      <button onClick={passwordView}>{showPassword.toString()}</button>
      <h5>Text: {apiKey}</h5>
    </>
  );
};
export default Form;
