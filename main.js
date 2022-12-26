let firstNumber = "";
let secondNumber = "";
let operator = "";
let result = "";
let isResultAvailable = false;
let count = 0;

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const displayValueContainer = document.querySelector(".display__value");
const displayHistoryContainer = document.querySelector(".display__history");
const equalsButton = document.querySelector(".button__equals");
const clearButton = document.querySelector(".button__clear");
const deleteButton = document.querySelector(".button__delete");

// TODO: KeyboardEvent;

function add(a, b) {
  return +a + +b;
}

function subtract(a, b) {
  return +a - +b;
}

function multiply(a, b) {
  return +a * +b;
}

function divide(a, b) {
  if (a === 0 || b === 0) {
    return alert("You cannot divide by 0!");
  }
  return +a / +b;
}

function modulo(a, b) {
  return +a % +b;
}

function operate(a, b, operator) {
  a = +a;
  b = +b;

  switch (operator) {
    case "+":
      return formatDecimals(add(a, b));
    case "−":
      return formatDecimals(subtract(a, b));
    case "×":
      return formatDecimals(multiply(a, b));
    case "÷":
      return formatDecimals(divide(a, b));
    case "%":
      return formatDecimals(modulo(a, b));
  }
}

function formatDecimals(number) {
  if (typeof number === "undefined") return;
  if (number % 1 !== 0) {
    return number.toFixed(2);
  }
  return number;
}

// this will populate display
function numberButtonHandler(number) {
  if (result) {
    if (number === "." && secondNumber.includes(".")) return;
    // append number to secondNumber
    secondNumber += number;
    updateHistory(result);
    isResultAvailable = false;
    displayValueContainer.textContent = secondNumber;
  } else if (operator === "") {
    if (number === "." && firstNumber.includes(".")) return;
    // if there is no operator update firstNumber
    firstNumber += number;
    displayValueContainer.textContent = firstNumber;
  } else if (operator) {
    if (number === "." && secondNumber.includes(".")) return;
    // if there is already an operator update secondNumber
    secondNumber += number;
    displayValueContainer.textContent = secondNumber;
  }
}

function operatorButtonHandler(operatorButtonTextContent) {
  if (operator) {
    equalsButtonHandler(); // when there is already an operator, treat it like an equals button
  }
  operator = operatorButtonTextContent;
  updateHistory();
}

function updateHistory() {
  displayHistoryContainer.textContent = `${firstNumber} ${operator} ${secondNumber}`;
}

function equalsButtonHandler() {
  // update history
  displayHistoryContainer.textContent = `${firstNumber} ${operator} ${secondNumber} =`;
  // get result
  result = operate(firstNumber, secondNumber, operator);
  if (typeof result === "undefined") {
    result = firstNumber;
  }
  displayValueContainer.textContent = result;
  // reset values using result
  firstNumber = result || firstNumber; // if result is present, make result the firstNumber for further calculation
  secondNumber = "";
  operator = "";
  isResultAvailable = true;
}

function clearAllValues() {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  result = "";
  isResultAvailable = false;
  displayHistoryContainer.textContent = "0";
  displayValueContainer.textContent = "0";
}

function clearCurrentValues() {
  // clear current value
  operator === "" ? (firstNumber = "") : (secondNumber = "");
  displayValueContainer.textContent = "0";
}

function deleteButtonHandler() {
  if (secondNumber && secondNumber.length > 0) {
    secondNumber = secondNumber.substring(0, secondNumber.length - 1);
    displayValueContainer.textContent = secondNumber;
  } else if (firstNumber && firstNumber.length > 0) {
    firstNumber = firstNumber.substring(0, firstNumber.length - 1);
    displayValueContainer.textContent = firstNumber;
  }
}

function updateClearButtonTextContent() {
  // check if any firstNumber, secondNumber, operator have a value
  if (displayValueContainer.textContent === "0") {
    clearButton.textContent = "AC";
  } else if (firstNumber || secondNumber || operator) {
    clearButton.textContent = "C";
  }
}

numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    numberButtonHandler(e.target.textContent);
    updateClearButtonTextContent();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    operatorButtonHandler(e.target.textContent);
    updateClearButtonTextContent();
  });
});

equalsButton.addEventListener("click", (e) => {
  equalsButtonHandler();
  updateClearButtonTextContent();
});

clearButton.addEventListener("click", (e) => {
  if (clearButton.textContent === "C") {
    clearCurrentValues();
  } else {
    clearAllValues();
  }
  updateClearButtonTextContent();
});

deleteButton.addEventListener("click", (e) => {
  deleteButtonHandler();
});

document.addEventListener("keydown", (e) => {
  // numbers
  if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
    numberButtonHandler(e.key);
    updateClearButtonTextContent();
  }

  // operators and functions
  switch (e.key) {
    case "+":
      operatorButtonHandler("+");
      break;
    case "-":
      operatorButtonHandler("−");
      break;
    case "*":
      operatorButtonHandler("×");
      break;
    case "/":
      operatorButtonHandler("÷");
      break;
    case "%":
      operatorButtonHandler("%");
      break;
    case "Enter":
      equalsButtonHandler();
      break;
    case "=":
      equalsButtonHandler();
      break;
    case "Backspace":
      deleteButtonHandler();
      break;
    case "c":
      if (clearButton.textContent === "C") {
        clearCurrentValues();
      } else {
        clearAllValues();
      }
      updateClearButtonTextContent();
      break;
  }
});
