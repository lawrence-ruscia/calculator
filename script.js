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
    handleEqualsKey(e);
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

// Track previous operand, operator, and current operand
// create a function operate() to perform the operation based on the operator

function handleEqualsKey(e) {
  if (
    operation.currentOperator === "" ||
    operation.operator === "" ||
    operation.previousOperand === ""
  ) {
    return;
  }

  const operand1 = parseFloat(operation.currentOperand);
  const operator = operation.operator;
  const operand2 = parseFloat(operation.previousOperand);

  let result = "";
  switch (operator) {
    case "+":
      result = operand1 + operand2;
      break;
  }

  console.log("result: " + result);
  return result;
}
