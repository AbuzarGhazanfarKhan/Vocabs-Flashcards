/**
 * LocalStorage manager for persisting card scheduling data
 */

const STORAGE_KEY = 'flashcard_scheduling_data';
const STATS_KEY = 'flashcard_stats';

/**
 * Load all card scheduling states from localStorage
 */
export function loadCardStates() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error loading card states:', error);
    return {};
  }
}

/**
 * Save card scheduling states to localStorage
 */
export function saveCardStates(cardStates) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cardStates));
  } catch (error) {
    console.error('Error saving card states:', error);
  }
}

/**
 * Get scheduling state for a specific card
 */
export function getCardState(cardName) {
  const states = loadCardStates();
  return states[cardName] || null;
}

/**
 * Update scheduling state for a specific card
 */
export function updateCardState(cardName, newState) {
  const states = loadCardStates();
  states[cardName] = newState;
  saveCardStates(states);
}

/**
 * Load user statistics
 */
export function loadStats() {
  try {
    const data = localStorage.getItem(STATS_KEY);
    return data ? JSON.parse(data) : {
      reviewedToday: 0,
      lastReviewDate: null,
      streak: 0,
      totalReviews: 0,
    };
  } catch (error) {
    console.error('Error loading stats:', error);
    return {
      reviewedToday: 0,
      lastReviewDate: null,
      streak: 0,
      totalReviews: 0,
    };
  }
}

/**
 * Save user statistics
 */
export function saveStats(stats) {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Error saving stats:', error);
  }
}

/**
 * Increment review count for today
 */
export function incrementReviewCount() {
  const stats = loadStats();
  const today = new Date().toISOString().split('T')[0];
  
  // Update streak
  if (stats.lastReviewDate === today) {
    // Same day, just increment
    stats.reviewedToday += 1;
  } else {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    if (stats.lastReviewDate === yesterdayStr) {
      // Consecutive day, increment streak
      stats.streak += 1;
    } else if (stats.lastReviewDate !== null) {
      // Gap in reviews, reset streak
      stats.streak = 1;
    } else {
      // First review
      stats.streak = 1;
    }
    
    stats.reviewedToday = 1;
    stats.lastReviewDate = today;
  }
  
  stats.totalReviews += 1;
  saveStats(stats);
  
  return stats;
}
