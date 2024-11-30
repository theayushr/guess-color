import React from "react"

export default function Button({colorName, handleClick}) {
  return (
  <button onClick = { () => handleClick({guessedColor : colorName})}>{colorName}</button>)
}
