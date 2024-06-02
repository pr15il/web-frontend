import { render, screen } from '@testing-library/react';
import App from './App';

test('renders powered link', () => {
  render(<App />);
  const linkElement = screen.getByText(/is powered by/i);
  expect(linkElement).toBeInTheDocument();
});
