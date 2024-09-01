const keypad = document.querySelector(".calculator-keypad");

const currentOperand = document.querySelector(".current-operand");
const previousOperand = document.querySelector(".previous-operand");

const operation = {
  currentOperand: "",
  operator: "",
  previousOperand: "",
};

keypad.addEventListener("click", (e) => {
  if (e.target.classList.contains("numeric")) {
    handleNumericKeys(e);
  }

  if (e.target.classList.contains("operator")) {
    handleOperatorKeys(e);
  }

  if (e.target.classList.contains("equals")) {
    handleEqualsKey();
  }

  if (e.target.classList.contains("all-clear")) {
    handleAllClearKey();
  }
});

function appendToDisplay(value) {
  if (currentOperand.textContent === "0") {
    currentOperand.textContent = "";
  }

  if (isOnlyOneDecimal(currentOperand.textContent, value)) {
    operation.currentOperand += value;

    console.log("current: " + operation.currentOperand);
    currentOperand.textContent += value;
  }
}

function isOnlyOneDecimal(textContent, value) {
  return value !== "." || !textContent.includes(".");
}

function handleNumericKeys(e) {
  const value = e.target.textContent;

  appendToDisplay(value);
}

function handleOperatorKeys(e) {
  const operator = e.target.textContent;
  operation.operator = operator;
  console.log("operator: " + operator);

  const currentTextContent = currentOperand.textContent;
  currentOperand.textContent = "";
  operation.currentOperand = ""; // clear current operand for new input

  previousOperand.textContent = `${currentTextContent} ${operator}`;
  operation.previousOperand += currentTextContent; // store current operand to previous
  console.log("previous: " + operation.previousOperand);
}

function handleEqualsKey() {
  if (
    operation.currentOperator === "" ||
    operation.operator === "" ||
    operation.previousOperand === ""
  ) {
    return;
  }

  const operand1 = parseFloat(operation.previousOperand);
  const operator = operation.operator;
  const operand2 = parseFloat(operation.currentOperand);

  let result = "";
  switch (operator) {
    case "+":
      result = add(operand1, operand2);
      break;
    case "-":
      result = subtract(operand1, operand2);
      break;
    case "×":
      result = multiply(operand1, operand2);
      break;
    case "÷":
      result = divide(operand1, operand2);
      break;
    case "%":
      result = modulo(operand1, operand2);
      break;
    default:
      console.log("ERROR: Invalid Operator");
  }

  console.log("result: " + result);
  updateResult(result);
}

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return y !== 0 ? x / y : "ERROR";
}

function modulo(x, y) {
  return x % y;
}

function updateResult(result) {
  previousOperand.textContent = "";
  currentOperand.textContent = result.toFixed(2);
}

function handleAllClearKey() {
  currentOperand.textContent = "";
  previousOperand.textContent = "";

  operation.currentOperand = "";
  operation.operator = "";
  operation.previousOperand = "";
}
