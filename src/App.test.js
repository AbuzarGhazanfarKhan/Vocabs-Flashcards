import { render, screen } from '@testing-library/react';
import App from './App';

test('renders vocabulary flashcards app', () => {
  render(<App />);
  const headingElement = screen.getByText(/Vocabulary Flashcards/i);
  expect(headingElement).toBeInTheDocument();
});
