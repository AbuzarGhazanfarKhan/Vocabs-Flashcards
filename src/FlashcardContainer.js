import React, { useState } from "react";
import Flashcard from "./Flashcard";
import flashcardsData from "./flashcards.json";

const FlashcardContainer = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [animateName, setAnimateName] = useState(false);

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === flashcardsData.length - 1 ? 0 : prevIndex + 1
    );
setAnimateName(true)
setTimeout(() => {
  setAnimateName(false);
}, 500);
  };
  const prevCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? flashcardsData.length - 1 : prevIndex - 1
    );
    setAnimateName(true);
    setTimeout(() => {
      setAnimateName(false);
    }, 500);
  };
  

  return (
    <div style={{maxHeight:`${animateName ? "200":""}`,maxWidth:`${animateName ? "400":""}` }} className={`${"flashcard-container"} `}>
      <button onClick={prevCard}>Previous Vocabulary</button> <br />
      <button onClick={nextCard}>Next Vocabulary</button>
      <Flashcard animateName={animateName} card={flashcardsData[currentCardIndex]} />
    </div>
  );
};

export default FlashcardContainer;
