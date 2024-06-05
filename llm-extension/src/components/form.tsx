// from https://ibaslogic.com/simple-guide-to-react-form/
import { useState } from "react";
const Form = () => {
  const [fname, setFname] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFname(e.target.value);
  };

  return (
    <>
      <h1>Controlled Form</h1>
      <form>
        <label>
          First Name:{""}
          <input type="text" value={fname} onChange={handleChange} />
        </label>
      </form>
      <h5>First name: {fname}</h5>
    </>
  );
};
export default Form;
