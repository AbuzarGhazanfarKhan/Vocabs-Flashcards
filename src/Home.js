import React, { useState, useEffect } from "react";
import flashcardsData from "./flashcards.json";
import { loadCardStates, loadStats } from "./utils/storage";
import { initializeCard, isCardDue } from "./utils/spacedRepetition";

const Home = ({ onNavigate }) => {
  const [dueCount, setDueCount] = useState(0);
  const [stats, setStats] = useState({ streak: 0, reviewedToday: 0, totalReviews: 0 });

  useEffect(() => {
    // Calculate due cards
    const cardStates = loadCardStates();
    let due = 0;

    flashcardsData.forEach((card) => {
      let state = cardStates[card.name];
      
      // Initialize card if it's new
      if (!state) {
        state = initializeCard(card.name);
      }

      // Check if card is due
      if (isCardDue(state)) {
        due++;
      }
    });

    setDueCount(due);
    
    // Load stats
    const userStats = loadStats();
    setStats(userStats);
  }, []);

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>📚 Vocabulary Flashcards</h1>
        <p className="subtitle">Master your vocabulary with spaced repetition</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card due-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-value">{dueCount}</div>
          <div className="stat-label">Cards Due Today</div>
        </div>

        <div className="stat-card streak-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-value">{stats.streak}</div>
          <div className="stat-label">Day Streak</div>
        </div>

        <div className="stat-card reviewed-card">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{stats.reviewedToday}</div>
          <div className="stat-label">Reviewed Today</div>
        </div>

        <div className="stat-card total-card">
          <div className="stat-icon">📊</div>
          <div className="stat-value">{flashcardsData.length}</div>
          <div className="stat-label">Total Cards</div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button
            className="action-btn primary"
            onClick={() => onNavigate("review")}
            disabled={dueCount === 0}
          >
            <span className="action-icon">🎓</span>
            <span className="action-text">Start Review</span>
            {dueCount > 0 && <span className="action-badge">{dueCount}</span>}
          </button>

          <button
            className="action-btn secondary"
            onClick={() => onNavigate("browse")}
          >
            <span className="action-icon">📖</span>
            <span className="action-text">Browse All Cards</span>
          </button>

          <button
            className="action-btn secondary"
            onClick={() => onNavigate("practice")}
          >
            <span className="action-icon">🔄</span>
            <span className="action-text">Practice Mode</span>
          </button>
        </div>
      </div>

      {dueCount === 0 && (
        <div className="no-due-message">
          <p>🎉 You're all caught up! No cards due for review right now.</p>
          <p>Come back tomorrow or practice some cards to keep learning!</p>
        </div>
      )}
    </div>
  );
};

export default Home;
