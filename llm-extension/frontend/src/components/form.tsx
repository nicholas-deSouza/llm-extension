// from https://ibaslogic.com/simple-guide-to-react-form/
import { useState } from "react";

import axios from "axios";

// object shape of information recieved from form
interface FormData {
  value1: string;
  value2: string;
}

const Form = () => {
  const [apiText, setapiText] = useState("");
  const [text, setText] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleAPITextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setapiText(event.target.value);
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
      value1: apiText,
      value2: text,
    };
    sendQueryAndKey(data);
  };

  const sendQueryAndKey = async (data: FormData) => {
    try {
      const response = await axios.post("https://your-backend-url.com/endpoint", data, {
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
            value={apiText}
            onChange={handleAPITextChange}
          ></input>
          What's your question?:{""}
          <input
            className="user-input"
            type="text"
            value={text}
            onChange={handleTextChange}
          ></input>
        </label>
      </form>
      <button onClick={passwordView}>{showPassword.toString()}</button>
      <h5>Text: {apiText}</h5>
    </>
  );
};
export default Form;
