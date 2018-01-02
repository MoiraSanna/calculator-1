let add = (a, b) => a + b;
let substract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;
let operate = (operator, a, b) => operator(a, b);

function buttonPressed(e, button=undefined) {
  button = button || e.target;
  button.classList.add("clicked");
  button.addEventListener("transitionend", removeClickedClass);
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

  if (e.key === "Backspace" || e.key === "Delete") {
    buttonPressed(e, buttons.filter(button => button.textContent === "CLEAR")[0]);
  }
}

// ********************************

let buttons = Array.from(document.querySelectorAll(".button"));
buttons.forEach(button => button.addEventListener("click", buttonPressed));

document.addEventListener("keydown", keyPressed)
