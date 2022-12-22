let firstNumber = "";
let secondNumber = "";
let operator = "";
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const displayValueContainer = document.querySelector(".display__value");
const displayHistoryContainer = document.querySelector(".display__history");

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
  return +a / +b;
}

function operate(a, b, operator) {
  a = +a;
  b = +b;
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

function resetScreen() {
  displayValueContainer.textContent = "";
}

function populateDisplayValue(number) {
  // whenever the number gets clicked, it updates the display__value
  displayValueContainer.textContent += number;
}

function populateDisplayHistory(value) {
  // whenever the equal button is clicked, it updates the display__history
}

// however we need to display during the process.
// Which I don't know how to
// we also need to reset firstNumber/secondNumber/operator
// when should we reset them?

// firstNumber gets filled in (update display__value)
// operator is chosen, in this case + (put the firstNumber & operator in the display__history)
// after operator is chosen, secondNumber gets filled in.
// clear display__value, and get input
// When the equal button is chosen, we use the operate(firstNumber, secondNumber, operator)
// and the result will be returned from the operate function
// we then shift the whole equation (e.g. 1 + 3 = 4) to display__history
// and we set display__value as result.
// after that, we want to use result as either firstNumber/secondNumber to further calculate more stuff.

// this will populate display
function numberButtonHandler(number) {
  firstNumber += number;
  displayValueContainer.textContent = firstNumber;
}

function operatorButtonHandler(operatorButtonTextContent) {
  operator = operatorButtonTextContent;
  updateHistory(firstNumber);
  console.log(operatorButtonTextContent);
}

function updateHistory(number) {
  displayHistoryContainer.textContent = `${number} ${operator}`;
}

numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    numberButtonHandler(e.target.textContent);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    operatorButtonHandler(e.target.textContent);
  });
});
