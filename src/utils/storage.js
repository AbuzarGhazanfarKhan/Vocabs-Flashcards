// LocalStorage utilities for persisting flashcard data

const STORAGE_KEY = 'vocabs-flashcards-data';

/**
 * Load flashcards from localStorage
 * @returns {Array|null} Flashcards array or null if not found
 */
export const loadCards = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading cards from localStorage:', error);
    return null;
  }
};

/**
 * Save flashcards to localStorage
 * @param {Array} cards - Array of flashcard objects
 * @returns {boolean} Success status
 */
export const saveCards = (cards) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    return true;
  } catch (error) {
    console.error('Error saving cards to localStorage:', error);
    return false;
  }
};

/**
 * Clear all flashcards from localStorage
 */
export const clearCards = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing cards from localStorage:', error);
    return false;
  }
};
