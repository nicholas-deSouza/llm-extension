// from https://ibaslogic.com/simple-guide-to-react-form/
import { useState } from "react";
const Form = () => {
  const [text, setText] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const passwordView = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <form>
        <label>
          LLM API Key:{""}
          <input
            type={showPassword ? "text" : "password"}
            value={text}
            onChange={handleChange}
          ></input>
        </label>
      </form>
      <button onClick={passwordView}>{showPassword.toString()}</button>
      <h5>Text: {text}</h5>
    </>
  );
};
export default Form;
