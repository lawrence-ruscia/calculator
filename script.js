// add a click event to target key
// append each key clicked on display
const keypad = document.querySelector(".calculator-keypad");

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
