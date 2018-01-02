let add = (a, b) => a + b;
let substract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;
let operate = (operator, a, b) => operator(a, b);

function buttonPressed(e, button=undefined) {
  button = button || e.target;
  let text = button.textContent;

  if (Number.isInteger(Number(text)) || text === "+"  || text === "-"  || text === "*"  || text === "/" || text === ".") {
    displayValue += text;
  } else if (text === "AC") {
    displayValue = "";
  } else if (text === "DEL") {
    displayValue = displayValue.substr(0, displayValue.length - 1);
  } else if (text === "=") {
    displayValue = calculate(displayValue);
  }

  display.textContent = displayValue;
  button.classList.add("clicked");
  button.addEventListener("transitionend", removeClickedClass);
}

function calculate(string) {
  console.log(string);
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

let display = document.querySelector(".display-text");

let buttons = Array.from(document.querySelectorAll(".button"));
buttons.forEach(button => button.addEventListener("click", buttonPressed));

document.addEventListener("keydown", keyPressed)
