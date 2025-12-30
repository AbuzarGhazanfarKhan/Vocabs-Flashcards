import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlashcards } from '../context/FlashcardsContext';
import './Review.css';

const Review = () => {
  const navigate = useNavigate();
  const { getDue, updateCard } = useFlashcards();
  const [dueCards, setDueCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewComplete, setReviewComplete] = useState(false);

  useEffect(() => {
    const cards = getDue();
    setDueCards(cards);
    if (cards.length === 0) {
      setReviewComplete(true);
    }
  }, [getDue]);

  const currentCard = dueCards[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRating = (rating) => {
    if (!currentCard || !isFlipped) return;

    updateCard(currentCard.id, rating);
    
    // Move to next card
    if (currentIndex < dueCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      setReviewComplete(true);
    }
  };

  const speak = () => {
    if (!currentCard) return;
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(currentCard.name);
    synth.speak(utterance);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!currentCard) return;

      // Space to flip
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      }

      // Only allow ratings when card is flipped
      if (isFlipped) {
        let rating = null;
        switch (e.key) {
          case '1':
            rating = 'again';
            break;
          case '2':
            rating = 'hard';
            break;
          case '3':
            rating = 'good';
            break;
          case '4':
            rating = 'easy';
            break;
          default:
            break;
        }
        
        if (rating) {
          updateCard(currentCard.id, rating);
          
          // Move to next card
          if (currentIndex < dueCards.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setIsFlipped(false);
          } else {
            setReviewComplete(true);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentCard, isFlipped, currentIndex, dueCards.length, updateCard]);

  if (reviewComplete || dueCards.length === 0) {
    return (
      <div className="review-container">
        <div className="empty-state">
          <h2>🎉 All Done!</h2>
          <p>You've reviewed all cards due for today.</p>
          <p>Great job! Come back tomorrow for more.</p>
          <button className="primary-button" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="review-container">
      <div className="review-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back
        </button>
        <div className="progress">
          {currentIndex + 1} / {dueCards.length}
        </div>
      </div>

      <div className="review-content">
        <div
          className={`review-card ${isFlipped ? 'flipped' : ''}`}
          onClick={handleFlip}
        >
          <div className="card-front">
            <h1 className="word">{currentCard.name}</h1>
            <button className="pronunciation-btn" onClick={(e) => {
              e.stopPropagation();
              speak();
            }}>
              🔊 Pronunciation
            </button>
            <p className="hint">Click card or press Space to flip</p>
          </div>
          <div className="card-back">
            <h3 className="word-title">{currentCard.name}</h3>
            <div className="definition-section">
              <h4>Definition:</h4>
              <p>{currentCard.description}</p>
            </div>
            <div className="example-section">
              <h4>Example:</h4>
              <p>{currentCard.example}</p>
            </div>
          </div>
        </div>

        {isFlipped && (
          <div className="rating-buttons">
            <button
              className="rating-btn again"
              onClick={() => handleRating('again')}
            >
              Again
              <span className="shortcut">1</span>
            </button>
            <button
              className="rating-btn hard"
              onClick={() => handleRating('hard')}
            >
              Hard
              <span className="shortcut">2</span>
            </button>
            <button
              className="rating-btn good"
              onClick={() => handleRating('good')}
            >
              Good
              <span className="shortcut">3</span>
            </button>
            <button
              className="rating-btn easy"
              onClick={() => handleRating('easy')}
            >
              Easy
              <span className="shortcut">4</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
