// Init
window.addEventListener("load", () => changeBg(), false);

// Short selectors alias
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const displayBackground = $(".background-color");

const currentHexColor = $(".current-color > span");
currentHexColor.addEventListener(
  "mouseenter",
  // Show history on mouse enter
  () => (hexColorHistory.style.visibility = "visible")
);

const hexColorHistory = $(".color-history");
hexColorHistory.addEventListener("mouseleave", () =>
  // # Seconds after mouse leaves
  setTimeout(() => {
    // hide the history
    hexColorHistory.style.visibility = "hidden";
    // restore color to the current.
    displayBackground.style.backgroundColor = currentHexColor.innerText;
  }, 350)
);

const changeColorButton = $(".bg-changer").addEventListener("click", changeBg);

const hoverColorPreview = document.addEventListener("mouseover", (e) => {
  // If is a hex, show a preview of the color in mouse over
  if (isHexColor(e.target.outerText)) {
    displayBackground.style.backgroundColor = e.target.outerText;
  }
});

// Saves the last 5 hex
const hexHistory = [];

// Returns true if the "value" pass to it is a valid hex, returns false otherwise
const isHexColor = (value) => /^#[0-9A-F]{6}$/i.test(value);

//
function changeBg() {
  // Hex color generator
  const randomColor =
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .toUpperCase();

  // Check if is NOT a valid hex
  if (!isHexColor(randomColor)) {
    console.log(`${randomColor} is not a valid hex`);
    // generate a new hex
    return changeBg();
  }

  // If valid then change the background color
  displayBackground.style.backgroundColor = randomColor;
  // Change text
  currentHexColor.innerText = randomColor;
  // Add new hex to history
  hexHistory.push(randomColor);

  // Check if history is bigger than 6, remove the first value if it is
  if (hexHistory.length > 6) hexHistory.shift();

  // If the first item of the history is NOT "undefined"
  if (hexHistory[hexHistory.length - 2] !== undefined) {
    // Create a new element
    const listElement = document.createElement("li");
    // Add the before last hex to the the list element
    listElement.innerText = hexHistory[hexHistory.length - 2];
    // Prepend (append as first child) to history list
    hexColorHistory.prepend(listElement);
  }

  // Get the list of nodes items ("li")
  const firstItem = $$("li");
  // Check if the list of nodes equals to 5, if it is remove the first node of the list
  if (firstItem.length == 6) firstItem[firstItem.length - 1].remove();
  // return currentHexColor;
}

// On doble click copy the text to the clipboard
document.ondblclick = () => {
  // const selection =
  // (document.selection && document.selection.createRange().text) ||
  // (window.getSelection && window.getSelection().toString());

  const selection = window.getSelection().toString();

  if (isHexColor("#" + selection)) {
    navigator.clipboard.writeText("#" + selection).then();
    //TODO: Add some kind of alert or notification to the user
  }
};
