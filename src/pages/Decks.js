import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlashcards } from '../context/FlashcardsContext';
import { getDueCount } from '../utils/spacedRepetition';
import './Decks.css';

const Decks = () => {
  const navigate = useNavigate();
  const { cards, resetAllCards } = useFlashcards();

  // For now, we have one main deck - "Vocabulary"
  // This can be extended to support multiple decks in the future
  const deck = {
    name: 'Vocabulary Collection',
    description: 'Master essential vocabulary words',
    totalCards: cards.length,
    dueCards: getDueCount(cards),
    lastStudied: cards.some(c => c.lastReviewed) 
      ? new Date(Math.max(...cards.filter(c => c.lastReviewed).map(c => new Date(c.lastReviewed)))).toLocaleDateString()
      : 'Never',
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This will mark all cards as due.')) {
      resetAllCards();
    }
  };

  return (
    <div className="decks-container">
      <div className="decks-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
        <h1>Your Decks</h1>
      </div>

      <div className="decks-grid">
        <div className="deck-card">
          <div className="deck-header">
            <h2>{deck.name}</h2>
            <p className="deck-description">{deck.description}</p>
          </div>
          
          <div className="deck-stats">
            <div className="deck-stat">
              <span className="stat-value">{deck.totalCards}</span>
              <span className="stat-label">Total Cards</span>
            </div>
            <div className="deck-stat highlight">
              <span className="stat-value">{deck.dueCards}</span>
              <span className="stat-label">Due Today</span>
            </div>
            <div className="deck-stat">
              <span className="stat-value">{deck.lastStudied}</span>
              <span className="stat-label">Last Studied</span>
            </div>
          </div>

          <div className="deck-actions">
            <button 
              className="study-button"
              onClick={() => navigate('/review')}
              disabled={deck.dueCards === 0}
            >
              Study Now
            </button>
            <button 
              className="practice-button"
              onClick={() => navigate('/practice')}
            >
              Practice All
            </button>
          </div>
        </div>
      </div>

      <div className="deck-management">
        <h3>Deck Management</h3>
        <button className="reset-button" onClick={handleReset}>
          Reset All Progress
        </button>
      </div>
    </div>
  );
};

export default Decks;
