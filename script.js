const keypad = document.querySelector(".calculator-keypad");

const currentOperand = document.querySelector(".current-operand");
const previousOperand = document.querySelector(".previous-operand");

const operation = {
  currentOperand: "",
  operator: "",
  previousOperand: "",
};

const compute = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "×": (x, y) => x * y,
  "÷": (x, y) => (y !== 0 ? x / y : "ERROR"),
  "%": (x, y) => x % y,
};

function handleClickEvents() {
  const clickEvent = "click";

  keypad.addEventListener(clickEvent, (e) => {
    if (e.target.classList.contains("numeric")) {
      handleNumericKeys(e, clickEvent);
    }

    if (e.target.classList.contains("operator")) {
      handleOperatorKeys(e, clickEvent);
    }

    if (e.target.classList.contains("equals")) {
      handleEqualsKey(e);
    }

    if (e.target.classList.contains("all-clear")) {
      handleAllClearKey();
    }

    if (e.target.classList.contains("delete")) {
      handleDeleteKey();
    }
  });
}

function handleKeydownEvents() {
  const keydownEvent = "keydown";

  document.addEventListener(keydownEvent, (e) => {
    const keyValue = e.key;

    if (isNumeric(keyValue)) {
      handleNumericKeys(e, keydownEvent);
    }
    if (isOperator(keyValue)) {
      handleOperatorKeys(e, keydownEvent);
    }
    if (isEnterKey(keyValue)) {
      handleEqualsKey(e);
    }
    if (isBackspace(keyValue)) {
      handleDeleteKey();
    }
    if (isAllClear(e, keyValue)) {
      handleAllClearKey();
    }
  });
}

function isNumeric(keyValue) {
  return keyValue.match(/[\d\.]/g);
}

function isOperator(keyValue) {
  return keyValue.match(/[+\-*/%]/g);
}

function isEnterKey(keyValue) {
  return keyValue === "Enter";
}

function isBackspace(keyValue) {
  return keyValue === "Backspace";
}

function isAllClear(e, keyValue) {
  return keyValue === "Escape" || (e.ctrlKey && keyValue === "Backspace");
}

function appendToDisplay(value) {
  if (currentOperand.textContent === "0") {
    currentOperand.textContent = "";
  }

  if (isOnlyOneDecimal(currentOperand.textContent, value)) {
    operation.currentOperand += value;

    currentOperand.textContent += value;
  }
}

function isOnlyOneDecimal(textContent, value) {
  return value !== "." || !textContent.includes(".");
}

function handleNumericKeys(e, eventType) {
  if (eventType === "click") {
    const clickValue = e.target.textContent;
    appendToDisplay(clickValue);
  }

  if (eventType === "keydown") {
    const keyValue = e.key;

    if (keyValue.match(/[F/d]/g)) {
      e.preventDefault();
      return;
    }

    appendToDisplay(keyValue);
  }
}

function handleOperatorKeys(e, eventType) {
  if (alreadyHaveAnOperation()) {
    handleEqualsKey();
  }

  let operator = "";
  if (eventType === "click") {
    operator = e.target.textContent;
  }

  if (eventType === "keydown") {
    const keyValue = e.key;

    if (keyValue === "*") {
      operator = "×";
    } else if (keyValue === "/") {
      operator = "÷";
    } else {
      operator = keyValue;
    }
  }

  operation.operator = operator;

  const currentTextContent = currentOperand.textContent;

  clearOperand();

  previousOperand.textContent = `${currentTextContent} ${operator}`;
  operation.previousOperand += currentTextContent; // store current operand to previous
}

function clearOperand() {
  currentOperand.textContent = "";
  previousOperand.textContent = "";

  operation.currentOperand = ""; // clear current operand for new input
  operation.previousOperand = "";
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
  const result = compute[operator](operand1, operand2);
  console.log(result);
  updateResult(result);
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
handleKeydownEvents();
