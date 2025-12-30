import React, { useState } from "react";
import "./App.css";
import Home from "./Home";
import ReviewSession from "./ReviewSession";
import Browse from "./Browse";
import FlashcardContainer from "./FlashcardContainer";

function App() {
  const [currentView, setCurrentView] = useState("home");

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="App">
      {currentView === "home" && <Home onNavigate={handleNavigation} />}
      {currentView === "review" && <ReviewSession onFinish={() => handleNavigation("home")} />}
      {currentView === "browse" && <Browse onNavigate={handleNavigation} />}
      {currentView === "practice" && (
        <div>
          <button className="back-btn" onClick={() => handleNavigation("home")}>← Back to Home</button>
          <h1>Vocabulary Flashcards - Practice Mode</h1>
          <FlashcardContainer />
        </div>
      )}
    </div>
  );
}

export default App;
