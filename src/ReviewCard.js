import React, { useState, useEffect, useCallback } from "react";
import { scheduleCard } from "./utils/spacedRepetition";
import { updateCardState, incrementReviewCount } from "./utils/storage";
import "./App.css";

const ReviewCard = ({ card, cardState, onCardRated, onFinishReview }) => {
  const [isFlipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
  }, [card]);

  const handleRating = useCallback((rating) => {
    const updatedState = scheduleCard(cardState, rating);
    updateCardState(card.name, updatedState);
    incrementReviewCount();
    onCardRated();
  }, [card.name, cardState, onCardRated]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        setFlipped(!isFlipped);
      } else if (isFlipped) {
        if (e.key === "1") {
          e.preventDefault();
          handleRating("again");
        } else if (e.key === "2") {
          e.preventDefault();
          handleRating("hard");
        } else if (e.key === "3") {
          e.preventDefault();
          handleRating("good");
        } else if (e.key === "4") {
          e.preventDefault();
          handleRating("easy");
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isFlipped, handleRating]);

  const handleFlip = () => {
    setFlipped(!isFlipped);
  };

  const speak = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(card.name);
    synth.speak(utterance);
  };

  if (!card) {
    return (
      <div className="review-container">
        <div className="empty-state">
          <h2>🎉 All done for today!</h2>
          <p>No more cards to review. Come back tomorrow or add new words!</p>
          <button onClick={onFinishReview}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="review-container">
      <div
        className={`flashcard ${isFlipped ? "flipped" : ""}`}
        style={{ border: `${isFlipped ? "black" : "white"}` }}
      >
        <div className="flashcard-front">
          <h1 className="name">{card.name}</h1>
          <button style={{ border: "2px solid white" }} onClick={speak}>
            🔊 Pronunciation
          </button>
          <button onClick={handleFlip}>Show Example and Meaning</button>
          <div className="keyboard-hint">
            <small>Press Space to flip</small>
          </div>
        </div>
        <div className="flashcard-back">
          <h3 className="name">Vocab: {card.name}</h3>
          <h3>Description:</h3>
          <p className={`description ${isFlipped ? "flip-in" : ""}`}>
            {card.description}
          </p>
          <h3>Example:</h3>
          <p className={`example ${isFlipped ? "flip-in" : ""}`}>
            {card.example}
          </p>
          <button onClick={handleFlip}>Show Vocab</button>
        </div>
      </div>

      {isFlipped && (
        <div className="rating-buttons">
          <h3>How well did you know this word?</h3>
          <div className="button-row">
            <button
              className="rating-btn again"
              onClick={() => handleRating("again")}
            >
              <span className="rating-key">1</span>
              <span className="rating-label">Again</span>
              <span className="rating-interval">Review tomorrow</span>
            </button>
            <button
              className="rating-btn hard"
              onClick={() => handleRating("hard")}
            >
              <span className="rating-key">2</span>
              <span className="rating-label">Hard</span>
              <span className="rating-interval">Shorter interval</span>
            </button>
            <button
              className="rating-btn good"
              onClick={() => handleRating("good")}
            >
              <span className="rating-key">3</span>
              <span className="rating-label">Good</span>
              <span className="rating-interval">Normal interval</span>
            </button>
            <button
              className="rating-btn easy"
              onClick={() => handleRating("easy")}
            >
              <span className="rating-key">4</span>
              <span className="rating-label">Easy</span>
              <span className="rating-interval">Longer interval</span>
            </button>
          </div>
          <div className="keyboard-hint">
            <small>Press 1-4 to rate</small>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
