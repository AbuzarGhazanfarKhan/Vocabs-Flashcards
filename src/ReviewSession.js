import React, { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import flashcardsData from "./flashcards.json";
import { loadCardStates } from "./utils/storage";
import { initializeCard, isCardDue } from "./utils/spacedRepetition";

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

const ReviewSession = ({ onFinish }) => {
  const [dueCards, setDueCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewedCount, setReviewedCount] = useState(0);

  useEffect(() => {
    // Load card states and filter for due cards
    const cardStates = loadCardStates();
    const due = [];

    flashcardsData.forEach((card) => {
      let state = cardStates[card.name];
      
      // Initialize card if it's new
      if (!state) {
        state = initializeCard(card.name);
      }

      // Check if card is due
      if (isCardDue(state)) {
        due.push({
          card,
          state,
        });
      }
    });

    // Shuffle due cards for variety using Fisher-Yates algorithm
    const shuffled = shuffleArray(due);
    setDueCards(shuffled);
  }, []);

  const handleCardRated = () => {
    setReviewedCount(reviewedCount + 1);
    
    // Move to next card
    if (currentIndex < dueCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // All cards reviewed
      setCurrentIndex(dueCards.length);
    }
  };

  const handleFinish = () => {
    onFinish();
  };

  const currentCard = currentIndex < dueCards.length ? dueCards[currentIndex] : null;

  return (
    <div className="review-session">
      <div className="review-header">
        <h2>Review Session</h2>
        <div className="review-progress">
          <span>Progress: {reviewedCount} / {dueCards.length}</span>
        </div>
      </div>
      
      {currentCard ? (
        <ReviewCard
          card={currentCard.card}
          cardState={currentCard.state}
          onCardRated={handleCardRated}
          onFinishReview={handleFinish}
        />
      ) : (
        <div className="review-container">
          <div className="empty-state">
            <h2>🎉 Review Complete!</h2>
            <p>You've reviewed {reviewedCount} card{reviewedCount !== 1 ? 's' : ''} today.</p>
            <p>Great job! Keep up the consistency! 💪</p>
            <button onClick={handleFinish}>Back to Home</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewSession;
