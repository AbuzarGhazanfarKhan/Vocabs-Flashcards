// Leitner System Implementation for Spaced Repetition

/**
 * Initialize card data with spaced repetition metadata
 * @param {Array} flashcards - Array of flashcard objects
 * @returns {Array} Flashcards with SR metadata
 */
export const initializeCards = (flashcards) => {
  return flashcards.map((card, index) => ({
    ...card,
    id: card.id || `card-${index}`,
    box: 1, // Leitner box (1-5)
    dueDate: new Date().toISOString(), // All cards start as due
    lastReviewed: null,
    reviewCount: 0,
    lapses: 0,
  }));
};

/**
 * Calculate next review date based on Leitner box
 * @param {number} box - Current Leitner box (1-5)
 * @returns {Date} Next review date
 */
const calculateNextReview = (box) => {
  const intervals = {
    1: 1,      // 1 day
    2: 3,      // 3 days
    3: 7,      // 1 week
    4: 14,     // 2 weeks
    5: 30,     // 1 month
  };
  
  const days = intervals[box] || 1;
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
};

/**
 * Update card based on user's rating
 * @param {Object} card - Card object
 * @param {string} rating - 'again', 'hard', 'good', 'easy'
 * @returns {Object} Updated card
 */
export const updateCard = (card, rating) => {
  const now = new Date();
  let newBox = card.box;
  let newLapses = card.lapses || 0;
  
  switch (rating) {
    case 'again':
      newBox = 1;
      newLapses = newLapses + 1;
      break;
    case 'hard':
      newBox = Math.max(1, card.box - 1);
      break;
    case 'good':
      newBox = Math.min(5, card.box + 1);
      break;
    case 'easy':
      newBox = Math.min(5, card.box + 2);
      break;
    default:
      break;
  }
  
  return {
    ...card,
    box: newBox,
    dueDate: calculateNextReview(newBox).toISOString(),
    lastReviewed: now.toISOString(),
    reviewCount: (card.reviewCount || 0) + 1,
    lapses: newLapses,
  };
};

/**
 * Check if a card is due for review
 * @param {Object} card - Card object
 * @returns {boolean} True if card is due
 */
export const isCardDue = (card) => {
  if (!card.dueDate) return true;
  return new Date(card.dueDate) <= new Date();
};

/**
 * Get all cards that are due for review
 * @param {Array} cards - Array of card objects
 * @returns {Array} Cards that are due
 */
export const getDueCards = (cards) => {
  return cards.filter(isCardDue);
};

/**
 * Get count of due cards
 * @param {Array} cards - Array of card objects
 * @returns {number} Count of due cards
 */
export const getDueCount = (cards) => {
  return getDueCards(cards).length;
};
