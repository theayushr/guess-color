import { useState } from "react";
import Button from "./Button";
import "./App.css";

const HEX_BASE = 16;
const MAX_HEX = 255;

const RIGHT = "right-guess",
  WRONG = "wrong-guess",
  NOT_RESPONDED = "not-responded";

/**
 * generates three random decimal numbers less than MAX_HEX, and then get's converted to the HEX decimal to represent a color
 */
function generateBackgroundColor() {
  const primaryColor = () => convertDecToHex(Math.floor(Math.random() * MAX_HEX));
  return `#${primaryColor()}${primaryColor()}${primaryColor()}`;
}

function convertDecToHex(dec) {
  let last = dec % HEX_BASE;
  let first = parseInt(dec / HEX_BASE);
  //numbers less than 255 will always come under two hexadecimal digits
  if (last > 9) {
    last = String.fromCharCode(96 + last - 9);
  }
  if (first > 9) {
    first = String.fromCharCode(96 + first - 9);
  }
  return `${first}${last}`;
}

// Fisher-Yates Shuffle
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function App() {
  const [color, setColor] = useState(generateBackgroundColor());
  const [answerStatus, setAnswerStatus] = useState(NOT_RESPONDED);
  const [btnColors, setBtnColors] = useState(
    shuffleArray([color, generateBackgroundColor(), generateBackgroundColor()])
  );

  function handleColor() {
    const newColor = generateBackgroundColor();
    setColor(newColor);
    setBtnColors(shuffleArray([newColor, generateBackgroundColor(), generateBackgroundColor()]));
    setAnswerStatus(NOT_RESPONDED);
  }

  function handleButtonClick({ guessedColor }) {
    if (guessedColor === color) {
      setAnswerStatus(RIGHT);
    } else {
      setAnswerStatus(WRONG);
    }
  }

  return (
    <>
      <div id="guess-color" style={{ backgroundColor: color }} onClick={handleColor}></div>
      <i>click to change the color</i>
      <div id="guess-buttons">
        <Button colorName={btnColors[0]} handleClick={handleButtonClick}></Button>
        <Button colorName={btnColors[1]} handleClick={handleButtonClick}></Button>
        <Button colorName={btnColors[2]} handleClick={handleButtonClick}></Button>
      </div>
      <h3 id="result">{answerStatus === RIGHT ? "Right Answer" : answerStatus === WRONG ? "Wrong Answer" : ""} </h3>
    </>
  );
}
