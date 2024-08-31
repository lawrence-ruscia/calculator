const keypad = document.querySelector(".calculator-keypad");

const previousOperand = document.querySelector(".previous-operand");
const currentOperand = document.querySelector(".current-operand");

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
  const currentOperand = document.querySelector(".current-operand");

  if (currentOperand.textContent === "0") {
    currentOperand.textContent = "";
  }

  if (isOnlyOneDecimal(currentOperand.textContent, value)) {
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

  const currentTextContent = currentOperand.textContent;

  currentOperand.textContent = "";

  previousOperand.textContent = `${currentTextContent} ${operator}`;
}

// TODO: Create functionality for equals button,
// it should do the operation on previousOperand & currentOperand after clicked

function handleEqualsKey(e) {}
