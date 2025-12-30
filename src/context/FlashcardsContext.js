import React, { createContext, useState, useEffect, useContext } from 'react';
import flashcardsData from '../flashcards.json';
import { initializeCards, updateCard as updateCardSR, getDueCards, getDueCount } from '../utils/spacedRepetition';
import { loadCards, saveCards } from '../utils/storage';

const FlashcardsContext = createContext();

export const useFlashcards = () => {
  const context = useContext(FlashcardsContext);
  if (!context) {
    throw new Error('useFlashcards must be used within FlashcardsProvider');
  }
  return context;
};

export const FlashcardsProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize cards from localStorage or flashcards.json
  useEffect(() => {
    const storedCards = loadCards();
    if (storedCards && storedCards.length > 0) {
      setCards(storedCards);
    } else {
      const initializedCards = initializeCards(flashcardsData);
      setCards(initializedCards);
      saveCards(initializedCards);
    }
    setLoading(false);
  }, []);

  // Save cards to localStorage whenever they change
  useEffect(() => {
    if (!loading && cards.length > 0) {
      saveCards(cards);
    }
  }, [cards, loading]);

  const updateCard = (cardId, rating) => {
    setCards(prevCards => {
      return prevCards.map(card => {
        if (card.id === cardId) {
          return updateCardSR(card, rating);
        }
        return card;
      });
    });
  };

  const getDue = () => getDueCards(cards);
  const getDueCountValue = () => getDueCount(cards);

  const resetAllCards = () => {
    const initializedCards = initializeCards(flashcardsData);
    setCards(initializedCards);
    saveCards(initializedCards);
  };

  const value = {
    cards,
    loading,
    updateCard,
    getDue,
    getDueCountValue,
    resetAllCards,
  };

  return (
    <FlashcardsContext.Provider value={value}>
      {children}
    </FlashcardsContext.Provider>
  );
};
