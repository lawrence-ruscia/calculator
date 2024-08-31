// add a click event to target key
// append each key clicked on display
const keypad = document.querySelector(".calculator-keypad");

const currentOperator = document.querySelector(".current-operator");
const previousOperator = document.querySelector(".previous-operator");

keypad.addEventListener("click", (e) => {
  if (e.target.classList.contains("numeric")) {
    const value = e.target.textContent;

    appendToDisplay(value);
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

// add click event to operators
// once an operator is clicked
// then add current operator to previous operator including the operator selected
// clear current operator
keypad.addEventListener("click", (e) => {
  if (e.target.classList.contains("operator")) {
    const operator = e.target.textContent;

    const currentTextContent = currentOperator.textContent;

    currentOperator.textContent = "";
    previousOperator.textContent = `${currentTextContent} ${operator}`;
  }
});
