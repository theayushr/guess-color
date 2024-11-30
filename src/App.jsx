import { useState, useEffect } from "react";
import Button from "./Button";
import "./App.css";

const HEX_BASE = 16;
const MAX_HEX = 255;

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

export default function App() {
  const [color, setColor] = useState(generateBackgroundColor());
  function handleColor() {
    setColor(generateBackgroundColor());
  }

  let colors = [color, generateBackgroundColor(), generateBackgroundColor()].sort(() => 0.5 - Math.random());

  return (
    <>
      <div id="guess-color" style={{ backgroundColor: color }} onClick={handleColor}></div>
      <i>click to change the color</i>
      <div id="guess-buttons">
        <Button name={colors[0]}></Button>
        <Button name={colors[1]}></Button>
        <Button name={colors[2]}></Button>
      </div>
    </>
  );
}
