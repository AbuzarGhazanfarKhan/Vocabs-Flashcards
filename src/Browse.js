import React, { useState, useEffect } from "react";
import flashcardsData from "./flashcards.json";
import { loadCardStates } from "./utils/storage";
import { initializeCard, isCardDue } from "./utils/spacedRepetition";

const Browse = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cards, setCards] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    // Load card states and merge with flashcard data
    const cardStates = loadCardStates();
    const enrichedCards = flashcardsData.map((card) => {
      let state = cardStates[card.name];
      
      // Initialize card if it's new
      if (!state) {
        state = initializeCard(card.name);
      }

      return {
        ...card,
        state,
        isDue: isCardDue(state),
      };
    });

    setCards(enrichedCards);
  }, []);

  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.example.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const dueCards = filteredCards.filter((card) => card.isDue);
  const notDueCards = filteredCards.filter((card) => !card.isDue);

  const toggleExpand = (cardName) => {
    setExpandedCard(expandedCard === cardName ? null : cardName);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays === -1) return "Yesterday";
    if (diffDays > 1) return `In ${diffDays} days`;
    return `${Math.abs(diffDays)} days ago`;
  };

  const CardItem = ({ card }) => {
    const isExpanded = expandedCard === card.name;
    
    return (
      <div className={`card-item ${card.isDue ? "due" : ""}`} onClick={() => toggleExpand(card.name)}>
        <div className="card-item-header">
          <h3 className="card-item-name">{card.name}</h3>
          <div className="card-item-meta">
            {card.isDue && <span className="due-badge">Due</span>}
            <span className="box-badge">Box {card.state.box}</span>
          </div>
        </div>
        
        {isExpanded && (
          <div className="card-item-details">
            <div className="card-detail-row">
              <strong>Description:</strong>
              <p>{card.description}</p>
            </div>
            <div className="card-detail-row">
              <strong>Example:</strong>
              <p>{card.example}</p>
            </div>
            <div className="card-stats">
              <span>Next review: {formatDate(card.state.dueDate)}</span>
              <span>Reviews: {card.state.repetitions}</span>
              {card.state.lastReviewed && (
                <span>Last: {formatDate(card.state.lastReviewed)}</span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="browse-container">
      <div className="browse-header">
        <h1>Browse All Cards</h1>
        <button className="back-btn" onClick={() => onNavigate("home")}>
          ← Back to Home
        </button>
      </div>

      <div className="browse-stats">
        <div className="stat">
          <strong>{dueCards.length}</strong> due now
        </div>
        <div className="stat">
          <strong>{notDueCards.length}</strong> upcoming
        </div>
        <div className="stat">
          <strong>{cards.length}</strong> total
        </div>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Search cards by name, description, or example..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {dueCards.length > 0 && (
        <div className="card-section">
          <h2 className="section-title">Due for Review ({dueCards.length})</h2>
          <div className="card-list">
            {dueCards.map((card) => (
              <CardItem key={card.name} card={card} />
            ))}
          </div>
        </div>
      )}

      {notDueCards.length > 0 && (
        <div className="card-section">
          <h2 className="section-title">Upcoming Reviews ({notDueCards.length})</h2>
          <div className="card-list">
            {notDueCards.map((card) => (
              <CardItem key={card.name} card={card} />
            ))}
          </div>
        </div>
      )}

      {filteredCards.length === 0 && (
        <div className="empty-state">
          <p>No cards found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
};

export default Browse;
