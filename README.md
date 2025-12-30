# Vocabulary Flashcards - Spaced Repetition App

A modern React-based vocabulary flashcard application with intelligent spaced repetition to help you master vocabulary efficiently.

## Features

### 🎯 Spaced Repetition Review Mode
- **Smart Scheduling**: Uses the Leitner system to optimize your learning
- **Review Sessions**: Study cards that are due for review today
- **Progress Tracking**: Cards are automatically scheduled based on your performance
- **Keyboard Shortcuts**: 
  - `Space`: Flip card
  - `1-4`: Rate your recall (Again/Hard/Good/Easy)

### 📊 Dashboard
- **Due Cards Counter**: See how many cards need review today
- **Quick Actions**: Start Review, Browse Decks, or Practice All
- **Statistics**: Track total cards and cards due

### 📚 Deck Management
- **Deck Overview**: View total cards, cards due, and last studied date
- **Multiple Study Modes**: Review mode (spaced repetition) or Practice mode (all cards)
- **Progress Reset**: Reset all progress if you want to start fresh

### 🎨 Enhanced User Experience
- **Card Flip Animation**: Smooth 3D flip effect
- **Text-to-Speech**: Hear correct pronunciation of vocabulary
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Empty States**: Clear messages when no cards are due

## How Spaced Repetition Works

The app uses the **Leitner system**, a proven spaced repetition method:

1. All new cards start in Box 1 (reviewed daily)
2. After seeing a card, you rate how well you knew it:
   - **Again (1)**: Card goes back to Box 1 (review tomorrow)
   - **Hard (2)**: Card moves down one box
   - **Good (3)**: Card moves up one box
   - **Easy (4)**: Card jumps up two boxes
3. Cards in higher boxes are reviewed less frequently:
   - Box 1: 1 day
   - Box 2: 3 days
   - Box 3: 7 days
   - Box 4: 14 days
   - Box 5: 30 days

This ensures you review difficult words more often and easy words less frequently, optimizing your study time.

## Getting Started

### Installation

```bash
npm install
```

### Running the App

```bash
npm start
```

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
npm run build
```

Builds the app for production to the `build` folder.

### Running Tests

```bash
npm test
```

Launches the test runner in interactive watch mode.

## Technology Stack

- **React 18.2**: Modern React with hooks
- **React Router**: Client-side routing
- **LocalStorage**: Persistent data storage
- **Web Speech API**: Text-to-speech pronunciation
- **CSS3**: Modern animations and gradients

## Data Persistence

All your progress is automatically saved to your browser's localStorage. This includes:
- Review schedule for each card
- Box level (learning progress)
- Last review date
- Review count and lapses

## Project Structure

```
src/
├── pages/           # Page components (Home, Review, Decks, Practice)
├── context/         # React context for global state
├── utils/           # Utility functions (spaced repetition logic, storage)
├── components/      # Reusable components (Flashcard, etc.)
├── App.js           # Main app with routing
└── flashcards.json  # Vocabulary data
```

## Contributing

Feel free to contribute by:
- Adding more vocabulary words to `flashcards.json`
- Improving the UI/UX
- Adding new features
- Fixing bugs

---

## Available Scripts (Create React App)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

