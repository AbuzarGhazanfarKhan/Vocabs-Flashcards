# Vocabulary Flashcards

A modern vocabulary learning application built with React, featuring **spaced repetition** to help you master new words efficiently.

## 🌟 Features

### Spaced Repetition Learning
- **Smart Review System**: Uses the Leitner system to schedule card reviews at optimal intervals
- **Four Rating Options**: Grade your knowledge as Again, Hard, Good, or Easy
- **Persistent Progress**: Your learning progress is automatically saved in your browser

### Dashboard & Statistics
- **Cards Due Today**: See how many cards need review
- **Streak Tracking**: Keep track of your consecutive study days
- **Review Statistics**: Monitor your daily progress and total reviews

### Study Modes
- **Review Mode**: Focus on cards that are due for review with spaced repetition scheduling
- **Practice Mode**: Browse and study any card at your own pace
- **Browse All Cards**: Search and explore your entire vocabulary collection

### User Experience
- **Keyboard Shortcuts**: 
  - Press `Space` to flip cards
  - Press `1-4` to rate cards in review mode
- **Card Flip Animation**: Smooth 3D flip effect for engaging study sessions
- **Text-to-Speech**: Hear pronunciation of vocabulary words
- **Search & Filter**: Quickly find cards by name, description, or example

## 📚 How Spaced Repetition Works

This app uses a simplified **Leitner System** with 5 boxes:

- **Box 1**: Review daily (new and difficult cards)
- **Box 2**: Review every 2 days
- **Box 3**: Review every 4 days
- **Box 4**: Review every 8 days
- **Box 5**: Review every 16 days

When you rate a card:
- **Again** (1): Move back to Box 1, review tomorrow
- **Hard** (2): Move back one box or stay in Box 1
- **Good** (3): Move to the next box
- **Easy** (4): Skip ahead two boxes

Cards you know well are reviewed less frequently, while challenging words come up more often.

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
```

Builds the app for production to the `build` folder.

### Testing

```bash
npm test
```

Runs the test suite in interactive watch mode.

## 💡 Usage Tips

1. **Start with Review Mode**: Begin each session by reviewing cards that are due
2. **Be Honest with Ratings**: Accurate self-assessment leads to better learning
3. **Maintain Your Streak**: Study daily to build a strong learning habit
4. **Use Practice Mode**: When you have extra time, practice cards that aren't due yet
5. **Search Feature**: Use the Browse view to look up specific words

## 🎨 Technology Stack

- **React 18**: Modern React with hooks
- **Create React App**: Quick setup and build tooling
- **LocalStorage**: Client-side persistence of learning progress
- **CSS3**: Animations and responsive design

## 📖 Data Structure

Each flashcard contains:
- **name**: The vocabulary word
- **description**: Definition or meaning
- **example**: Usage in a sentence

Scheduling data (stored in localStorage):
- **box**: Current Leitner box (1-5)
- **dueDate**: Next review date
- **lastReviewed**: Last study date
- **repetitions**: Total number of reviews
- **lapses**: Number of times rated as "Again"

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## 📄 License

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
