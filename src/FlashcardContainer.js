import React, { useState, useEffect } from "react";
import Flashcard from "./Flashcard";
import flashcardsData from "./flashcards.json";

/**
 * Fisher-Yates shuffle algorithm for unbiased randomization
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const FlashcardContainer = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [animateName, setAnimateName] = useState(false);
  const [shuffledCards, setShuffledCards] = useState([]);

  // Shuffle the flashcards array when the component mounts
  useEffect(() => {
    const shuffled = shuffleArray(flashcardsData);
    setShuffledCards(shuffled);
  }, []);

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === shuffledCards.length - 1 ? 0 : prevIndex + 1
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
      prevIndex === 0 ? shuffledCards.length - 1 : prevIndex - 1
    );

    // Trigger the name animation
    setAnimateName(true);

    // Reset the animation class after a short delay
    setTimeout(() => {
      setAnimateName(false);
    }, 500); // Adjust the delay as needed (500ms for a 0.5s animation)
  };  

  if (shuffledCards.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{maxHeight:`${animateName ? "200":""}`,maxWidth:`${animateName ? "400":""}` }} className={`${"flashcard-container"} `}>
      <button onClick={prevCard}>Previous Vocabulary</button> <br />
      <button onClick={nextCard}>Next Vocabulary</button>
      <Flashcard animateName={animateName} card={shuffledCards[currentCardIndex]} />
    </div>
  );
};

export default FlashcardContainer;
