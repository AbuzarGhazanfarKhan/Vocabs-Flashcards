import React, { useState, useEffect } from "react";
import Flashcard from "./Flashcard";
import flashcardsData from "./flashcards.json";

const FlashcardContainer = () => {
  // const [currentCardIndex, setCurrentCardIndex] = useState(0);
  // const [animateName, setAnimateName] = useState(false);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [prevCardIndex, setPrevCardIndex] = useState(null);
  const [animateName, setAnimateName] = useState(false);

  // Shuffle the flashcards array (Fisher-Yates shuffle) when the component mounts
  useEffect(() => {
    const shuffledFlashcards = [...flashcardsData];
    for (let i = shuffledFlashcards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledFlashcards[i], shuffledFlashcards[j]] = [
        shuffledFlashcards[j],
        shuffledFlashcards[i],
      ];
    }
    flashcardsData.length = 0;
    flashcardsData.push(...shuffledFlashcards);
  }, []);

  useEffect(() => {
    // Initialize the previous card index when the component mounts
    setPrevCardIndex(currentCardIndex);
  }, [currentCardIndex]);

  const nextCard = () => {
    // Update the current card index while keeping track of the previous index
    setPrevCardIndex(currentCardIndex);
    setCurrentCardIndex((prevIndex) =>
      prevIndex === flashcardsData.length - 1 ? 0 : prevIndex + 1
    );

    // Trigger the name animation
    setAnimateName(true);

    // Reset the animation class after a short delay
    setTimeout(() => {
      setAnimateName(false);
    }, 500); // Adjust the delay as needed (500ms for a 0.5s animation)
  };

  const prevCard = () => {
    // Restore the previous card by decrementing the current card index
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? flashcardsData.length - 1 : prevIndex - 1
    );

    // Trigger the name animation
    setAnimateName(true);

    // Reset the animation class after a short delay
    setTimeout(() => {
      setAnimateName(false);
    }, 500); // Adjust the delay as needed (500ms for a 0.5s animation)
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
