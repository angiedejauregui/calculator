import "./scss/app.scss";
import { useState } from "react";

const calcData = [
  { id: "clear", value: "AC" },
  { id: "c", value: "C" },
  { id: "divide", value: "/" },
  { id: "seven", value: 7 },
  { id: "eight", value: 8 },
  { id: "nine", value: 9 },
  { id: "multiply", value: "x" },
  { id: "four", value: 4 },
  { id: "five", value: 5 },
  { id: "six", value: 6 },
  { id: "subtract", value: "-" },
  { id: "one", value: 1 },
  { id: "two", value: 2 },
  { id: "three", value: 3 },
  { id: "add", value: "+" },
  { id: "zero", value: 0 },
  { id: "decimal", value: "." },
  { id: "equals", value: "=" },
];
const operators = ["AC", "C", "/", "x", "-", "+", "="];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Key = ({ keyData: { id, value }, handleInput }) => (
  <button id={id} onClick={() => handleInput(value)}>
    {value}
  </button>
);

const Keyboard = ({ handleInput }) => (
  <div className="keys">
    {calcData.map((key) => (
      <Key key={key.id} keyData={key} handleInput={handleInput} />
    ))}
  </div>
);

const Display = ({ input, output }) => (
  <div className="output">
    <span className="result">{output}</span>
    <span className="input" id="display">
      {input}
    </span>
  </div>
);

const App = () => {
  const [input, setInput] = useState("0");
  const [output, setOutput] = useState("");
  const [calculatorData, setCalculatorData] = useState("");

  const handleSubmit = () => {
    const total = eval(calculatorData);
    setInput(`${total}`);
    setOutput(`${total}`);
    setCalculatorData(`${total}`);
  };

  const handleClear = () => {
    setInput("0");
    setCalculatorData("");
    setOutput("");
  };

  const handleC = () => {
    setInput(input.substring(0, input.length - 1));
    setCalculatorData(calculatorData.substring(0, calculatorData.length - 1));
    setOutput(output.substring(0, output.length - 1));
    if (input.length === 1) {
      setInput("0");
      setOutput("0");
    }
  };

  const handleNumbers = (value) => {
    if (!calculatorData.length) {
      setInput(`${value}`);
      setCalculatorData(`${value}`);
      setOutput(value);
    } else {
      if (value === 0 && (calculatorData === "0" || input === "0")) {
        setCalculatorData(`${calculatorData}`);
      } else {
        if (input.length < 13 && calculatorData.length < 18) {
          const lastChat = calculatorData.charAt(calculatorData.length - 1);
          const isLastChatOperator =
            lastChat === "*" || operators.includes(lastChat);
          setInput(isLastChatOperator ? `${value}` : `${input}${value}`);
          setCalculatorData(`${calculatorData}${value}`);
          setOutput(`${output}${value}`);
        }
      }
    }
  };

  const handleDecimal = () => {
    const lastChat = calculatorData.charAt(calculatorData.length - 1);
    if (!calculatorData.length) {
      setInput("0.");
      setCalculatorData("0.");
      setOutput("0.");
    } else {
      if (lastChat === "*" || operators.includes(lastChat)) {
        setInput("0.");
        setCalculatorData(`${calculatorData} 0.`);
        setOutput(output + "0.");
      } else {
        setInput(
          lastChat === "." || input.includes(".") ? `${input}` : `${input}.`
        );
        const formattedValue =
          lastChat === "." || input.includes(".")
            ? `${calculatorData}`
            : `${calculatorData}.`;
        setCalculatorData(formattedValue);
        setOutput(formattedValue);
      }
    }
  };

  const handleOperators = (value) => {
    const validOp = value === "x" ? "*" : value;
    if (calculatorData.length) {
      setInput(`${value}`);
      setOutput(output + " " + value + " ");
      setCalculatorData(calculatorData + validOp);
      const beforeLastChat = calculatorData.charAt(calculatorData.length - 2);
      const beforeLastChatIsOperator =
        beforeLastChat === "*" || operators.includes(beforeLastChat);
      const lastChat = calculatorData.charAt(calculatorData.length - 1);
      const lastChatIsOperator =
        lastChat === "*" || operators.includes(lastChat);
      if (
        (lastChatIsOperator && value !== "-") ||
        (beforeLastChatIsOperator && lastChatIsOperator)
      ) {
        if (beforeLastChatIsOperator) {
          const updatedValue = `${calculatorData.substring(
            0,
            calculatorData.length - 2
          )}${value}`;
          setCalculatorData(updatedValue);

          const updated = `${calculatorData.substring(
            0,
            calculatorData.length - 2
          )} ${value} `;
          setOutput(updated);
        } else {
          setCalculatorData(
            `${calculatorData.substring(
              0,
              calculatorData.length - 1
            )}${validOp}`
          );
          setOutput(`${output.substring(0, output.length - 2)} ${value} `);
        }
      } else {
        setCalculatorData(`${calculatorData}${validOp}`);
        setOutput(`${output} ${value} `);
      }
    }
  };

  const handleInput = (value) => {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);

    switch (value) {
      case "=":
        handleSubmit();
        break;
      case "AC":
        handleClear();
        break;
      case "C":
        handleC();
        break;
      case number:
        handleNumbers(value);
        break;
      case ".":
        handleDecimal(value);
        break;
      case operator:
        handleOperators(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <div className="calculator">
        <Display input={input} output={output} />
        <Keyboard handleInput={handleInput} />
      </div>
    </div>
  );
};

export default App;
