import "./styles.css";
import { useState } from "react";
import usePasswordGenerator from "./hooks/use-pasword-generator";
import PasswordStrengthIndicator from "./components/StrengthChecker";
const App = () => {
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false }
  ]);
  const [copied, setCopied] = useState(false);
  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
  };

  setTimeout(() => {
    setCopied(false);
  }, 1000);

  const { password, error, generatePassword } = usePasswordGenerator();
  return (
    <div className="container">
      {password && (
        <div className="header">
          <div className="title">{password}</div>
          <button className="copybtn" onClick={handleCopy}>
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
      <div className="charlength">
        <span>
          <label>Charecter Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="28"
          // value={}
          onChange={(e) => {
            setLength(e.target.value);
          }}
        />
      </div>
      <div className="checkboxes">
        {checkboxData.map((checkbox, index) => {
          return (
            <div key={index}>
              <input
                type="checkbox"
                onChange={() => {
                  handleCheckboxChange(index);
                }}
                checked={checkbox.state}
              />
              <label>{checkbox.title}</label>
            </div>
          );
        })}
      </div>
      <PasswordStrengthIndicator password={password} />
      {error && <div className="error">{error}</div>}
      <button
        className="generateBtn"
        onClick={() => generatePassword(checkboxData, length)}
      >
        Generate Password
      </button>
    </div>
  );
};
export default App;
