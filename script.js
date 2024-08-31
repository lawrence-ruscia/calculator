const keypad = document.querySelector(".calculator-keypad");

const previousOperator = document.querySelector(".previous-operator");
const currentOperator = document.querySelector(".current-operator");

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
  const currentOperator = document.querySelector(".current-operator");

  if (currentOperator.textContent === "0") {
    currentOperator.textContent = "";
  }

  if (isOnlyOneDecimal(currentOperator.textContent, value)) {
    currentOperator.textContent += value;
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

  const currentTextContent = currentOperator.textContent;

  currentOperator.textContent = "";

  previousOperator.textContent = `${currentTextContent} ${operator}`;
}

// TODO: Create functionality for equals button,
// it should do the operation on previousOperator & currentOperator after clicked

function handleEqualsKey(e) {}
