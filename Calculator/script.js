const scientificModeBtn = document.querySelector(".scientific__mode");
const standardModeBtn = document.querySelector(".standard__mode");
const darkModeBtn = document.querySelector("#dark");
const lightModeBtn = document.querySelector("#light");
const blueModeBtn = document.querySelector("#blue");

const themeSelected = document.querySelector(".theme__selected");
const themeOptions = document.querySelector(".theme__options");
const displayExpression = document.querySelector(".display__expression");
const displayResult = document.querySelector(".display__result");
const layout = document.querySelector(".layout");
const buttons = document.querySelector(".buttons");

const scientificBtns = document.querySelector(".buttons__scientific");

const getTheme = localStorage.getItem("theme");

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
});
lightModeBtn.addEventListener("click", () => {
  localStorage.setItem("theme", "light");
});
blueModeBtn.addEventListener("click", () => {
  localStorage.setItem("theme", "blue");
});

function EnableDarkMode() {
  localStorage.getItem("theme");
}
function EnableLightMode() {
  localStorage.getItem("theme");
}
function EnableBlueMode() {
  localStorage.getItem("theme");
}
