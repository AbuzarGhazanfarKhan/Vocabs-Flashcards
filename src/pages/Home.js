import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlashcards } from '../context/FlashcardsContext';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { getDueCountValue, cards } = useFlashcards();
  const dueCount = getDueCountValue();

  return (
    <div className="home-container">
      <h1>Vocabulary Flashcards</h1>
      <p className="subtitle">Master vocabulary with spaced repetition</p>
      
      <div className="stats-card">
        <div className="stat-item">
          <div className="stat-number">{dueCount}</div>
          <div className="stat-label">Cards Due Today</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{cards.length}</div>
          <div className="stat-label">Total Cards</div>
        </div>
      </div>

      <div className="action-buttons">
        <button 
          className="primary-button"
          onClick={() => navigate('/review')}
          disabled={dueCount === 0}
        >
          Start Review
        </button>
        <button 
          className="secondary-button"
          onClick={() => navigate('/decks')}
        >
          Browse Decks
        </button>
        <button 
          className="secondary-button"
          onClick={() => navigate('/practice')}
        >
          Practice All
        </button>
      </div>
    </div>
  );
};

export default Home;
