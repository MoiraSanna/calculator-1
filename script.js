let add = (a, b) => a + b;
let substract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;
let operate = (operator, a, b) => operator(a, b);

function buttonPressed(e, button=undefined) {
  button = button || e.target;
  let text = button.textContent;

  if (Number.isInteger(Number(text)) || text === ".") {
    displayValue += button.textContent;
  } else if (text == "+" || text == "-" || text == "*" || text == "/") {
    operator = getOperator(text);
    firstNumber = displayValue;
    displayValue += ` ${text} `;
  } else if (text === "=" && operator) {
    secondNumber = displayValue.substring(3 + firstNumber.length);
    if (operator === divide && !secondNumber) {
      displayValue = "Math ERROR";
    } else {
      displayValue = String(Math.round(operate(operator, Number(firstNumber), Number(secondNumber)) * 1000000) / 1000000);
    }
    operator = null;
    firstNumber = null;
    secondNumber = null;
  } else if (text === "AC") {
    operator = null;
    firstNumber = null;
    secondNumber = null;
    displayValue = "";
  } else if (text === "DEL") {
    if (displayValue[displayValue.length - 1] === " ") {
      displayValue = displayValue.substr(0, displayValue.length - 3);
      operator = null;
      firstNumber = null;
    } else {
      displayValue = displayValue.substr(0, displayValue.length - 1);
    }
  }

  display.textContent = displayValue;
  button.classList.add("clicked");
  button.addEventListener("transitionend", removeClickedClass);
}

function getOperator(operatorString) {
  switch (operatorString) {
    case "+":
      return add;
      break;
    case "-":
      return substract;
      break;
    case "*":
      return multiply;
      break;
    case "/":
      return divide;
      break;
  }
}


function removeClickedClass(e) {
  e.target.classList.remove("clicked");
  e.target.removeEventListener("transitionend", removeClickedClass);
}

function keyPressed(e) {
  buttons.forEach(button => {
    if (e.key === button.textContent) {
      buttonPressed(e, button);
    }
  });

  if (e.key === "Enter" || e.key === " ") {
    buttonPressed(e, buttons.filter(button => button.textContent === "=")[0]);
  }

  if (e.key === "Backspace") {
    buttonPressed(e, buttons.filter(button => button.textContent === "DEL")[0]);
  }

  if (e.key === "Delete") {
    buttonPressed(e, buttons.filter(button => button.textContent === "AC")[0]);
  }
}

// ********************************

let displayValue = "";
let firstNumber;
let secondNumber;
let operator;

let display = document.querySelector(".display-text");

let buttons = Array.from(document.querySelectorAll(".button"));
buttons.forEach(button => button.addEventListener("click", buttonPressed));

document.addEventListener("keydown", keyPressed)
