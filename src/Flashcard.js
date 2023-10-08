import React, { useState, useEffect } from "react";
import "./App.css";

const Flashcard = ({ card, animateName }) => {
  const [isFlipped, setFlipped] = useState(false);
console.log(animateName);
useEffect(() => {
  // Reset the flip state when a new card is shown
  setFlipped(false);
}, [card]);

const handleFlip = () => {
  setFlipped(!isFlipped);
};
function speak() {
   
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(card.name);

  synth.speak(utterance);
}

return (
  <div
    className={`flashcard ${isFlipped ? "flipped" : ""} ${
      animateName ? "flashcard-enter" : ""
    }`}
    style={{border:`${isFlipped ? "black":"white"}`}}
   
  >
    <div className="flashcard-front">
      <h1 className={`name ${animateName ? "scale-in" : ""}`}>{card.name}</h1>
      <button style={{border:"2px solid white"}} onClick={speak}>Pronunciation</button>
      <button onClick={handleFlip}>Show Example and Meaning</button>
    </div>
    <div className="flashcard-back">
    <h3 className={`name `}>Vocab: {card.name}</h3>
      <h3>description: </h3>
      <p className={`description ${isFlipped ? "flip-in" : ""}`}>
        {card.description}
      </p>
      <h3>example: </h3>
      <p className={`example ${isFlipped ? "flip-in" : ""}`}>{card.example}</p>
      <button onClick={handleFlip}>Show Vocab</button>
    </div>
  </div>
);
};



export default Flashcard;
