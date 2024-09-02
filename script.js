const keypad = document.querySelector(".calculator-keypad");

const currentOperand = document.querySelector(".current-operand");
const previousOperand = document.querySelector(".previous-operand");

const operation = {
  currentOperand: "",
  operator: "",
  previousOperand: "",
};

function handleClickEvents() {
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

    if (e.target.classList.contains("delete")) {
      handleDeleteKey();
    }
  });
}

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
  if (alreadyHaveAnOperation()) {
    handleEqualsKey();
  }

  const operator = e.target.textContent;
  operation.operator = operator;
  console.log("operator: " + operator);

  const currentTextContent = currentOperand.textContent;
  currentOperand.textContent = "";
  previousOperand.textContent = "";
  operation.currentOperand = ""; // clear current operand for new input
  operation.previousOperand = "";

  previousOperand.textContent = `${currentTextContent} ${operator}`;
  operation.previousOperand += currentTextContent; // store current operand to previous
  console.log("previous: " + operation.previousOperand);
}

function alreadyHaveAnOperation() {
  return (
    previousOperand.textContent !== "" &&
    operation.operator !== "" &&
    currentOperand.textContent !== ""
  );
}

function handleEqualsKey() {
  if (
    operation.currentOperand === "" ||
    operation.operator === "" ||
    operation.previousOperand === ""
  ) {
    return;
  }

  const operand1 = parseFloat(operation.previousOperand);
  const operator = operation.operator;
  const operand2 = parseFloat(operation.currentOperand);

  operate(operand1, operator, operand2);
}

function operate(operand1, operator, operand2) {
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

  if (result === "ERROR") {
    currentOperand.textContent = "Error";
    return;
  }

  currentOperand.textContent = parseFloat(result.toFixed(2));
}

function handleAllClearKey() {
  currentOperand.textContent = "0";
  previousOperand.textContent = "";

  operation.currentOperand = "";
  operation.operator = "";
  operation.previousOperand = "";
}

function handleDeleteKey() {
  let currentLength = currentOperand.textContent.length;
  if (currentLength > 1) {
    currentOperand.textContent = currentOperand.textContent.slice(0, -1);
    operation.currentOperand = operation.currentOperand.slice(0, -1);
  } else {
    currentOperand.textContent = "0";
    operation.currentOperand = "0";
  }
}

handleClickEvents();
