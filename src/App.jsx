import React, { useState, useEffect } from "react";
import { randomColor, isHexColor } from "./randomColor";

function App() {
  const [bgColor, setBgColor] = useState(() => randomColor());
  const [previewColor, setPreviewColor] = useState("");
  const [visibility, setVisibility] = useState("hidden");
  const [hexHistory, setHexHistory] = useState([]);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(bgColor.length);
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (bgColor === "") return setBgColor(randomColor);

    if (!isHexColor(bgColor)) {
      setBgColor(bgColor);
      console.log("not valid");
      return;
    }

    setBgColor(randomColor);

    setHexHistory((hexHistory) => [bgColor, ...hexHistory]);

    if (hexHistory.length >= 5) hexHistory.pop();
  }

  return (
    <div
      className="background-color"
      style={{
        backgroundColor: previewColor == "" ? `#${bgColor}` : previewColor,
      }}
    >
      <form onSubmit={handleSubmit}>
        <div
          className="current-color menu"
          onMouseEnter={() => setVisibility(!visibility ? "hidden" : "visible")}
          onMouseLeave={() =>
            setTimeout(() => {
              setVisibility(visibility ? "hidden" : "visible");
            }, 300)
          }
        >
          <label
            style={{
              border: isHexColor(bgColor) ? "solid black" : "solid red",
            }}
          >
            #
            <input
              spellCheck="false"
              style={{ width: width + "ch" }}
              type="text"
              maxLength="8"
              value={bgColor}
              autoComplete="off"
              onChange={(e) => setBgColor(e.target.value.toUpperCase())}
            />
          </label>
          <ul className="color-history" style={{ visibility: visibility }}>
            {hexHistory.map((item, i) => (
              <li
                key={i}
                onMouseEnter={(e) => setPreviewColor(`#${e.target.innerText}`)}
                onMouseOut={() => setPreviewColor("")}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <button type="submit" className="bg-changer glow-on-hover">
          RANDOM COLOR!
        </button>
      </form>
    </div>
  );
}

export default App;
