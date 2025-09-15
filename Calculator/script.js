const scientificModeBtn = document.querySelector(".scientific__mode");
const standardModeBtn = document.querySelector(".standard__mode");
const darkModeBtn = document.querySelector("#dark");
const lightModeBtn = document.querySelector("#light");
const purpleModeBtn = document.querySelector("#purple");

const themeSelected = document.querySelector(".theme__selected");
const themeOptions = document.querySelector(".theme__options");
let displayExpression = document.querySelector(".display__expression");
let displayResult = document.querySelector(".display__result");
const layout = document.querySelector(".layout");
const buttons = document.querySelector(".buttons");
const allButtons = document.querySelectorAll(".btn");

const scientificBtns = document.querySelector(".buttons__scientific");

let getTheme = localStorage.getItem("theme");
let result = "";
let expression = "";
const operationChar = ["+", "-", "*", "/"];

scientificModeBtn.addEventListener("click", () => {
  scientificBtns.classList.remove("hidden");
  layout.classList.remove("layout__standard-width");
  layout.classList.add("layout__scientific-width");
  buttons.classList.add("buttons__grid-style");
  standardModeBtn.classList.remove("header__cacl-active-mode");
  scientificModeBtn.classList.add("header__cacl-active-mode");
});
standardModeBtn.addEventListener("click", () => {
  scientificBtns.classList.add("hidden");
  layout.classList.remove("layout__scientific-width");
  layout.classList.add("layout__standard-width");
  buttons.classList.remove("buttons__grid-style");
  scientificModeBtn.classList.remove("header__cacl-active-mode");
  standardModeBtn.classList.add("header__cacl-active-mode");
});

themeSelected.addEventListener("click", () => {
  themeOptions.classList.toggle("hidden");
});

darkModeBtn.addEventListener("click", () => {
  localStorage.setItem("theme", "dark");
  getTheme = localStorage.getItem("theme");
  if (getTheme === "dark") EnableDarkMode();
});
lightModeBtn.addEventListener("click", () => {
  localStorage.setItem("theme", "light");
  getTheme = localStorage.getItem("theme");
  if (getTheme === "light") EnableLightMode();
});
purpleModeBtn.addEventListener("click", () => {
  localStorage.setItem("theme", "purple");
  getTheme = localStorage.getItem("theme");
  if (getTheme === "purple") EnablePurpleMode();
});

function EnableDarkMode() {
  document.body.classList.remove("purplemode");
  document.body.classList.add("darkmode");
}
function EnableLightMode() {
  document.body.classList.remove("purplemode");
  document.body.classList.remove("darkmode");
}
function EnablePurpleMode() {
  document.body.classList.remove("darkmode");
  document.body.classList.add("purplemode");
}

function Calculate(btnValu) {
  if (btnValu === "=") {
    result = eval(expression);
  } else if (btnValu === "C") {
    expression = "";
    result = "";
  } else if (btnValu === "CE") {
    expression = expression.slice(0, -1);
  } else {
    expression += btnValu;
  }

  displayResult.textContent = result;
  displayExpression.textContent = expression;
}

allButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    Calculate(e.target.dataset.value);
  });
});
