import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FlashcardsProvider } from "./context/FlashcardsContext";
import Home from "./pages/Home";
import Review from "./pages/Review";
import Decks from "./pages/Decks";
import Practice from "./pages/Practice";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState("home");

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  return (
    <FlashcardsProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/review" element={<Review />} />
            <Route path="/decks" element={<Decks />} />
            <Route path="/practice" element={<Practice />} />
          </Routes>
        </div>
      </Router>
    </FlashcardsProvider>
  );
}

export default App;
