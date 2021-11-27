const button = document.querySelector(".bg-changer");
button.addEventListener("click", setBg);

const bg = document.querySelector(".background-color");

// const currentColor = document.querySelector(".current-color");
const currentColor = document.querySelector(".current-color > span");
const mouseColor = document.addEventListener("mouseover", colorPreview);
const colorHistoryD = document.querySelector(".color-history");
currentColor.addEventListener("mouseenter", showHistory);

colorHistoryD.addEventListener("mouseleave", hideHistory);
// currentColor.addEventListener("mouseleave", hideHistory);

const colorHistory = [];

const isHexColor = (value) => /^#[0-9A-F]{6}$/i.test(value);

function setBg() {
  const randomColor =
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .toUpperCase();

  if (isHexColor(randomColor)) {
    bg.style.backgroundColor = randomColor;
  }

  // currentColor.childNodes[0].textContent = randomColor;
  currentColor.innerText = randomColor;

  colorHistory.push(randomColor);

  if (colorHistory.length >= 6) colorHistory.shift();

  const firstItem = document.querySelectorAll("li");

  if (firstItem.length >= 5) firstItem[firstItem.length - 1].remove();

  if (colorHistory[colorHistory.length - 2] !== undefined) {
    let el = document.createElement("li");
    el.innerText = colorHistory[colorHistory.length - 2];
    colorHistoryD.prepend(el);
  }
}

function colorPreview(e) {
  if (isHexColor(e.target.outerText)) {
    bg.style.backgroundColor = e.target.outerText;
  }
}

document.ondblclick = () => {
  // const sel =
  //   (document.selection && document.selection.createRange().text) ||
  //   (window.getSelection && window.getSelection().toString());

  const sel = window.getSelection().toString();

  navigator.clipboard.writeText("#" + sel).then(
    function () {
      /* clipboard successfully set */
    },
    function () {
      /* clipboard write failed */
    }
  );
};

function showHistory() {
  colorHistoryD.style.visibility = "visible";
}
function hideHistory() {
  setTimeout(() => {
    colorHistoryD.style.visibility = "hidden";
  }, 200);
}

setBg();
