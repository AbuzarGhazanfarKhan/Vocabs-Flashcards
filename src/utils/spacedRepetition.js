/**
 * Spaced Repetition Scheduler using a simplified Leitner System
 * 
 * The Leitner system uses boxes (levels) to organize cards:
 * - Box 1: Review daily
 * - Box 2: Review every 2 days
 * - Box 3: Review every 4 days
 * - Box 4: Review every 8 days
 * - Box 5: Review every 16 days
 * 
 * When a card is answered correctly (Good/Easy), it moves to the next box.
 * When answered incorrectly (Again) or with difficulty (Hard), it moves back.
 */

const BOXES = [
  { level: 1, intervalDays: 1 },    // Daily
  { level: 2, intervalDays: 2 },    // Every 2 days
  { level: 3, intervalDays: 4 },    // Every 4 days
  { level: 4, intervalDays: 8 },    // Every 8 days
  { level: 5, intervalDays: 16 },   // Every 16 days
];

/**
 * Initialize a new card's scheduling data
 */
export function initializeCard(cardName) {
  return {
    name: cardName,
    box: 1,
    dueDate: new Date().toISOString().split('T')[0], // Due today
    lastReviewed: null,
    repetitions: 0,
    lapses: 0,
  };
}

/**
 * Calculate next review date based on rating
 * @param {Object} cardState - Current card state
 * @param {string} rating - 'again', 'hard', 'good', or 'easy'
 * @returns {Object} - Updated card state
 */
export function scheduleCard(cardState, rating) {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  let newBox = cardState.box;
  let intervalDays = 1;
  
  switch (rating) {
    case 'again':
      // Move back to box 1, review tomorrow
      newBox = 1;
      intervalDays = 1;
      break;
      
    case 'hard':
      // Stay in same box or move back one, shorter interval
      newBox = Math.max(1, cardState.box - 1);
      intervalDays = BOXES[newBox - 1].intervalDays;
      break;
      
    case 'good':
      // Move to next box (capped at max box)
      newBox = Math.min(BOXES.length, cardState.box + 1);
      intervalDays = BOXES[newBox - 1].intervalDays;
      break;
      
    case 'easy':
      // Move to next box + 1 (or max), longer interval
      newBox = Math.min(BOXES.length, cardState.box + 2);
      intervalDays = BOXES[newBox - 1].intervalDays;
      break;
      
    default:
      intervalDays = 1;
  }
  
  // Calculate due date
  const dueDate = new Date(today);
  dueDate.setDate(dueDate.getDate() + intervalDays);
  const dueDateStr = dueDate.toISOString().split('T')[0];
  
  return {
    ...cardState,
    box: newBox,
    dueDate: dueDateStr,
    lastReviewed: todayStr,
    repetitions: cardState.repetitions + 1,
    lapses: rating === 'again' ? cardState.lapses + 1 : cardState.lapses,
  };
}

/**
 * Check if a card is due for review
 */
export function isCardDue(cardState) {
  const today = new Date().toISOString().split('T')[0];
  return cardState.dueDate <= today;
}

/**
 * Get cards that are due for review
 */
export function getDueCards(allCardStates) {
  const today = new Date().toISOString().split('T')[0];
  return allCardStates.filter(card => card.dueDate <= today);
}
