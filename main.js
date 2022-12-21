const buttons = document.querySelector(".buttons");
const buttonNodeList = document.querySelectorAll(".button");
const displayValue = document.querySelector(".display__value");

function displayValueToView(value) {
  displayValue.textContent = value;
}

let tempString = "";
let firstOperand = "";
let secondOperand = "";
let operator = "";

function handleButtonClick(valueDataset) {
  console.log(valueDataset);
  if (valueDataset.type === "number") {
    tempString += valueDataset.value;
    displayValueToView(tempString);
  }
  if (valueDataset.type === "function") {
    // tempString to operand and reset string
    if (!firstOperand) {
      firstOperand = tempString;
      tempString = "";
    }

    if (firstOperand) {
      secondOperand = tempString;
    }

    // plus
    if (firstOperand && secondOperand) {
      const result = +firstOperand + +secondOperand;
      displayValueToView(result);
      tempString = "";
      firstOperand = "";
      secondOperand = "";
    }
  }
}

// Attach all the functions to the buttons
buttonNodeList.forEach((button) => {
  addEventListener("click", (e) => {
    if (e.target === button) {
      handleButtonClick(e.target.dataset);
    }
  });
});
