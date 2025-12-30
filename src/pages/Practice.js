import React from 'react';
import { useNavigate } from 'react-router-dom';
import FlashcardContainer from '../FlashcardContainer';
import './Practice.css';

const Practice = () => {
  const navigate = useNavigate();

  return (
    <div className="practice-container">
      <div className="practice-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
        <h1>Practice Mode</h1>
        <p className="practice-description">Practice all vocabulary cards (progress not tracked)</p>
      </div>
      <FlashcardContainer />
    </div>
  );
};

export default Practice;
